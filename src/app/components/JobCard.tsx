"use client"

import { useEffect, useState, useRef } from "react";
import ChevronDown from '../icons/chevronDown.svg';
import ChevronUp from '../icons/chevronUp.svg';
import './styles/JobCard.css'

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

//  ОСТАЛОСЬ СДЕЛАТЬ:
// 2. кнопка респонд (прсто алерт?)
// 3. собственно css

export default function JobCard({ vacancy }: { vacancy: Item }) {

    const [description, setDescription] = useState("");
    const [expandedDescription, setExpandedDescription] = useState(false);

    const expandRef = useRef()

    useEffect(() => {
        fetch(vacancy.url)
            .then((res) => res.json())
            .then((data) => setDescription(data.description));
    }, [vacancy.url]);

    const address = (vacancy: Item) => {
        if (vacancy.address) {
            return vacancy.address.raw;
        }
        if (vacancy.area) {
            return vacancy.area.name;
        }
        return '';
    }

    const salary = (vacancy: Item) => {
        if (vacancy.salary) {
            if (vacancy.salary.from && vacancy.salary.to && vacancy.salary.currency) {
                return `${vacancy.salary.from} - ${vacancy.salary.to}, ${vacancy.salary.currency}`
            }

            if (vacancy.salary.from && vacancy.salary.to) {
                return `${vacancy.salary.from} - ${vacancy.salary.to}`
            }

            if (vacancy.salary.from && vacancy.salary.currency) {
                return `from ${vacancy.salary.from}, ${vacancy.salary.currency}`
            }

            if (vacancy.salary.to && vacancy.salary.currency) {
                return `to ${vacancy.salary.from}, ${vacancy.salary.currency}`
            }

            if (vacancy.salary.from) {
                return `from ${vacancy.salary.from}`
            }

            if (vacancy.salary.to) {
                return `to ${vacancy.salary.from}`
            }
        }
        else {
            return '';
        }
    }

    const logo = (vacancy: Item) => {
        if (vacancy.employer && vacancy.employer.logo_urls) {
            return vacancy.employer.logo_urls.original;
        }
        else {
            return '';
        }
    }

    function clickRespond() {

    }

    return (

        <div className='vacancy-card'>
            <div className="vacancy-card__head">
                <div>
                    <h3>{vacancy.name}</h3>
                    {logo(vacancy) != '' && <img className="vacancy-card__logo" src={logo(vacancy)}></img>}
                </div>
                <a
                    className="respondButton"
                    href={vacancy.alternate_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Respond
                </a>
            </div>
            <div className="vacancy-card__info">
                <p>
                    <span className="text-gray">Form </span>
                    <span>{vacancy.employment.name}</span>
                </p>
                <p>
                    <span className="text-gray">Company </span>
                    <span>{vacancy.employer.name}</span>
                </p>
                <p>
                    <span className="text-gray">Experience </span>
                    <span>{vacancy.experience.name}</span>
                </p>
                <p>
                    <span className="text-gray">Address </span>
                    <span>{address(vacancy)}</span>
                </p>
                {salary(vacancy) != '' &&
                    <p>
                        <span className="text-gray">Salary </span>
                        <span>{salary(vacancy)}</span>
                    </p>}
            </div>
            <div className="vacancy-card__description">
                <div className={`description-content__overlay ${expandedDescription ? 'disabled' : 'enabled'}`}>
                    <div
                        className={`description-content ${expandedDescription ? 'expanded' : 'hidden'}`}
                        dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                {expandedDescription == false && <button className='vacancy-card__expand-button' ref={expandRef.current}
                    onClick={() => setExpandedDescription((prevState) => !prevState)}>
                    More details
                    <ChevronDown className="chevron" />
                </button>}
                {expandedDescription == true && <button className='vacancy-card__expand-button' ref={expandRef.current}
                    onClick={() => setExpandedDescription((prevState) => !prevState)}>
                    Less details
                    <ChevronUp className="chevron" />
                </button>}
            </div>
        </div>
    );
}
