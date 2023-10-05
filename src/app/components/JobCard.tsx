"use client"

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
};

//  ОСТАЛОСЬ СДЕЛАТЬ:
// 1. раскрытие описания (ввести стейт)
// 2. кнопка респонд (прсто алерт?)
// 3. собственно css

export default function JobCard({ vacancy }: { vacancy: Item }) {



    const address = (vacancy: Item) => {
        if (vacancy.address) {
            return vacancy.address.raw;
        }
        if (vacancy.area) {
            return vacancy.area.name;
        }
        return null
    }

    const salary = (vacancy: Item) => {
        if (vacancy.salary) {
            if (vacancy.salary.from && vacancy.salary.to && vacancy.salary.currency) {
                return `${vacancy.salary.from} - ${vacancy.salary.to}, ${vacancy.salary.currency}`
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

            return null
        }
    }

    return (
        // сделать фильтрацию и описание
        <div className='vacancy-card'>
            <div>
                <h3>{vacancy.name}</h3>
                <img></img>
                <button>Respond</button>
            </div>
            <div>
            <p>{address(vacancy)}</p>
            <p>{vacancy.experience.name}</p>
            <p>{vacancy.employment.name}</p>
            <p>{salary(vacancy)}</p>
            </div>
            <div>
                {/* тут будет описание  */}
            </div>
            <button>More details</button>
        </div>
    );
}
