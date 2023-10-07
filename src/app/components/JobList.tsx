"use client"

import { useState, useEffect, useRef } from 'react'
import JobCard from './JobCard'
import Close from '../icons/close.svg'
import './styles/JobList.css'
import { Data } from '../types/Data'

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

    return (
        <div>
            <h1 className="header">List of vacancies</h1>
            <div className='filters'>
                <div className='filters-section'>
                    <div className='filter'>
                        <label>Form</label>
                        <select className='filters-section__selector'
                            value={selectedForm?.id || ''}
                            onChange={(e) => setSelectedForm((prev) => ({ ...prev, id: String(e.target.value) }))}
                        >
                            <option value=''>Not selected</option>
                            {formOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='filter'>
                        <label>Experience</label>
                        <select className='filters-section__selector'
                            value={selectedExperience?.id || ''}
                            onChange={(e) => setSelectedExperience((prev) => ({ ...prev, id: String(e.target.value) }))}
                        >
                            <option value=''>Not selected</option>
                            {experienceOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className='search-button' onClick={() => searchVacancies(0)}>Search</button>
            </div>
            {(selectedForm != null || selectedExperience != null) && <button className='clear-button' onClick={clearFilters}>
                <Close className="close-icon" />
                Clear filters</button>}
            {loading ? <p className='loading-section'>Loading...</p> :
                <ul className='vacancy-list'>
                    {data?.items.map((item) => (
                        <li key={item.id}>
                            <JobCard vacancy={item} />
                        </li>
                    ))}
                </ul>}
            {data && currentPage <= data.pages && <button className='show-more-button' onClick={showMore}>Show more</button>}
        </div>
    );
}
