"use client"

import { useState, useEffect } from 'react'
import Header from './components/Header';

type resultProps = {
  id: string;
  name: string;
};


export default function Page() {

  const [data, setData] = useState<resultProps[]>([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.hh.ru/vacancies?page=1')
      .then((res) => res.json())
      .then((data) => {
        setData(data.items)
        setLoading(false)
      })
  }, [])


  if (!data) {
    return (
      <div>
        <Header />
        <p>No vacancies found.</p>
      </div>
    );
  }

  else {
    return (
      <div>
        <Header />

        <ul>
          {data.map(item => (
            <li key={item.id}>
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
