export type Adress = {
    city?: string;
    raw?: string;
}

export type Area = {
    name: string;
}

export type Salary = {
    from?: number;
    to?: number;
    currency?: string;
}

export type Metro = {
    station_name: string;
    line_name: string;
}

export type Logos = {
    original?: string;
}

export type Employer = {
    name: string;
    logo_urls?: Logos;
}

export type Experience = {
    name?: string;
}

export type Employment = {
    name?: string;
}

export type Item = {
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

export type Data = {
    items: Item[];
    pages: number;
}
