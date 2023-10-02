"use client"

import { useState, useEffect } from 'react'
import JobCard from './JobCard'

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
    length: number;
};

type Data = {
    items: Item[];
    pages: number;
    per_page: number;
    page: number
}

export default function JobList() {

    const ITEMS_PER_PAGE = 5;

    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayedVacancies, setDisplayedVacancies] = useState<Item[]>([]);

    useEffect(() => {
        fetch(`https://api.hh.ru/vacancies?page=${currentPage}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                setLoading(false);
            })

            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [currentPage]);

    const showMore = () => {
        if (data && data.items) {
            const nextVacancies = data.items.slice(
                displayedVacancies.length,
                displayedVacancies.length + ITEMS_PER_PAGE
            );
            setDisplayedVacancies((prevVacancies) => [...prevVacancies, ...nextVacancies]);
        }

    }

    useEffect(() => {
        if (data && data.items) {
            const initialVacancies = data.items.slice(0, ITEMS_PER_PAGE);
            setDisplayedVacancies(initialVacancies);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!displayedVacancies || displayedVacancies.length === 0) {
        return <p>No vacancies found.</p>;
    }

    else {
        return (
            <>
                <h1>List of vacancies</h1>
                <div className="filters__section">
                    <select>
                        <option>Full time</option>
                        <option>Half time</option>
                        <option>Part time</option>
                    </select>
                    <select>
                        <option>Нет опыта</option>
                    </select>
                    <button>Search</button>
                </div>
                <ul>
                    {displayedVacancies.map((item) => (
                        <li key={item.id}>
                            <JobCard vacancy={item} />
                        </li>
                    ))}
                </ul>
                <button onClick={showMore}>Show more</button>
            </>
        );
    }
}
