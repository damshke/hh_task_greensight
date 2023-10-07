"use client"

import { useEffect, useState, useRef } from "react";
import ChevronDown from '../icons/chevronDown.svg';
import ChevronUp from '../icons/chevronUp.svg';
import './styles/JobCard.css'
import { Item } from "../types/Data";

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
        const { salary } = vacancy;

        if (!salary) {
            return '';
        }

        const { from, to, currency } = salary;
        const parts: string[] = [];

        if (from) {
            parts.push(`from ${from}`);
        }

        if (to) {
            parts.push(`to ${to}`);
        }

        if (currency) {
            parts.push(currency);
        }

        return parts.join(' ');
    }

    const logo = (vacancy: Item) => {
        if (vacancy.employer && vacancy.employer.logo_urls) {
            return vacancy.employer.logo_urls.original;
        }
        else {
            return '';
        }
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
                    <span className="text">{vacancy.employment.name}</span>
                </p>
                <p>
                    <span className="text-gray">Company </span>
                    <span className="text">{vacancy.employer.name}</span>
                </p>
                <p>
                    <span className="text-gray">Experience </span>
                    <span className="text">{vacancy.experience.name}</span>
                </p>
                <p>
                    <span className="text-gray">Address </span>
                    <span className="text">{address(vacancy)}</span>
                </p>
                {salary(vacancy) != '' &&
                    <p>
                        <span className="text-gray">Salary </span>
                        <span className="text">{salary(vacancy)}</span>
                    </p>}
            </div>
            <div className="vacancy-card__description">
                <div className={`description-content__overlay ${expandedDescription ? 'disabled' : 'enabled'}`}>
                    <div
                        className={`description-content ${expandedDescription ? 'expanded' : 'hidden'}`}
                        dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <button className='vacancy-card__expand-button' ref={expandRef.current}
                    onClick={() => setExpandedDescription((prevState) => !prevState)}>
                    {expandedDescription ? "Less details"  : "More details"}
                    {expandedDescription ? <ChevronUp className="chevron" /> : <ChevronDown className="chevron" />}
                </button>
            </div>
        </div>
    );
}
