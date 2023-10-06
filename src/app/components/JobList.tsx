"use client"

import { useState, useEffect, useRef } from 'react'
import JobCard from './JobCard'
import Close from '../icons/close.svg'
import './styles/JobList.css'

type Adress = {
    city?: string;
    raw?: string;
}

type Area = {
    name: string;
}

type Salary = {
    from?: number;
    to?: number;
    currency?: string;
}

type Metro = {
    station_name: string;
    line_name: string;
}

type Logos = {
    original?: string;
}

type Employer = {
    name: string;
    logo_urls?: Logos;
}

type Experience = {
    name?: string;
}

type Employment = {
    name?: string;
}

type Item = {
    id: string;
    name: string;
    area: Area;
    address: Adress;
    salary: Salary;
    merto_stations: Metro;
    employer: Employer;
    experience: Experience;
    employment: Employment;
    url: string;
    alternate_url: string;
};

type Data = {
    items: Item[];
    pages: number;
}

type Option = {
    id: string;
    name?: string;
}

export default function JobList() {
    const ITEMS_PER_PAGE = 5;

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);

    const [formOptions, setFormOptions] = useState<Option[]>([]);
    const [experienceOptions, setExperienceOptions] = useState<Option[]>([]);
    const [selectedForm, setSelectedForm] = useState<Option | null>(null);
    const [selectedExperience, setSelectedExperience] = useState<Option | null>(null);


    const searchVacancies = (page: number) => {
        console.log(selectedForm, selectedExperience);
        let search = {
            page: String(page),
            per_page: String(ITEMS_PER_PAGE)
        }
        if (selectedForm?.id) Object.assign(search, { employment: String(selectedForm.id) })
        if (selectedExperience?.id) Object.assign(search, { experience: String(selectedExperience.id) })

        const params = new URLSearchParams(search).toString();

        fetch(`https://api.hh.ru/vacancies?${params}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((responseData) => {
                if (page > 0) {
                    setData((prevData) => ({
                        ...prevData,
                        items: [...(prevData?.items || []), ...responseData.items],
                        pages: responseData.pages,
                    }));
                }
                else {
                    setData(({
                        ...responseData,
                        items: [...responseData.items],
                        pages: responseData.pages
                    }));
                }

                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        fetch('https://api.hh.ru/dictionaries')
            .then((res) => res.json())
            .then((data) => {
                setFormOptions(data.employment);
                setExperienceOptions(data.experience);
            })
            .catch((error) => {
                console.error('Error loading:', error);
            });
    }, []);

    useEffect(() => {
        searchVacancies(0);
    }, []);

    const showMore = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(currentPage + 1);
        searchVacancies(nextPage);
    };

    const clearFilters = () => {
        setSelectedExperience(null);
        setSelectedForm(null);
    };

    useEffect(() => {
        if (selectedForm == null && selectedExperience == null) searchVacancies(0);
    }, [selectedForm, selectedExperience]);

    if (loading) {
        return (
            <div>
                <h1>List of vacancies</h1>
                <div className='card-container'>
                    <div className='filters_section'>
                        <div>
                            <div>
                                <label>Form</label>
                                <select required
                                    value={selectedForm?.id || ''}
                                    onChange={(e) => setSelectedForm((prev) => ({ ...prev, id: String(e.target.value) }))}
                                >
                                    <option value='' disabled selected>Not selected</option>
                                    {formOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Experience</label>
                                <select required
                                    value={selectedExperience?.id || ''}
                                    onChange={(e) => setSelectedExperience((prev) => ({ ...prev, id: String(e.target.value) }))}
                                >
                                    <option value='' disabled selected>Not selected</option>
                                    {experienceOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className='searchButton' onClick={() => searchVacancies(0)}>Search</button>
                    </div>
                    {(selectedForm != null || selectedExperience != null) && <button className='clearButton' onClick={clearFilters}>
                        <Close className="closeIcon" />
                        Clear filters</button>}
                </div>
                <p className='loading-section'>Loading...</p>
            </div>
        );
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!data?.items || data.items.length === 0) {
        return (
            <div>
                <h1>List of vacancies</h1>
                <div className='card-container'>
                    <div className='filters_section'>
                        <div>
                            <div>
                                <label>Form</label>
                                <select required
                                    value={selectedForm?.id || ''}
                                    onChange={(e) => setSelectedForm((prev) => ({ ...prev, id: String(e.target.value) }))}
                                >
                                    <option value='' disabled selected>Not selected</option>
                                    {formOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Experience</label>
                                <select required
                                    value={selectedExperience?.id || ''}
                                    onChange={(e) => setSelectedExperience((prev) => ({ ...prev, id: String(e.target.value) }))}
                                >
                                    <option value='' disabled selected>Not selected</option>
                                    {experienceOptions.map((option) => (
                                        <option key={option.id} value={option.id}>
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button className='searchButton' onClick={() => searchVacancies(0)}>Search</button>
                    </div>
                    {(selectedForm != null || selectedExperience != null) && <button className='clearButton' onClick={clearFilters}>
                        <Close className="closeIcon" />
                        Clear filters</button>}
                </div>
            </div>
        );
    }

    const hasMorePages = currentPage <= data.pages;

    return (
        <div>
            <h1>List of vacancies</h1>
            <div className='filters_section'>
                <div>
                    <div>
                        <label>Form</label>
                        <select required
                            value={selectedForm?.id || ''}
                            onChange={(e) => setSelectedForm((prev) => ({ ...prev, id: String(e.target.value) }))}
                        >
                            <option value='' disabled selected>Not selected</option>
                            {formOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Experience</label>
                        <select required
                            value={selectedExperience?.id || ''}
                            onChange={(e) => setSelectedExperience((prev) => ({ ...prev, id: String(e.target.value) }))}
                        >
                            <option value='' disabled selected>Not selected</option>
                            {experienceOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className='searchButton' onClick={() => searchVacancies(0)}>Search</button>
            </div>
            {(selectedForm != null || selectedExperience != null) && <button className='clearButton' onClick={clearFilters}>
                <Close className="closeIcon" />
                Clear filters</button>}
            <ul>
                {data.items.map((item) => (
                    <li key={item.id}>
                        <JobCard vacancy={item} />
                    </li>
                ))}
            </ul>
            {hasMorePages && <button className='showMoreButton' onClick={showMore}>Show more</button>}
        </div>
    );
}
