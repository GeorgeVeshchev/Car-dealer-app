"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [makes, setMakes] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    fetch('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
      .then(response => response.json())
      .then(data => setMakes(data.Results));
  }, []);

  useEffect(() => {
    setIsButtonEnabled(selectedMake && selectedYear);
  }, [selectedMake, selectedYear]);

  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(currentYear - 2014 + 1), (v, i) => currentYear - i);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Car Dealer App</h1>
      <div className="mt-4">
        <label className="block">Select Make:</label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="border p-2 w-full text-black" 
        >
          <option value="">Choose a make</option>
          {makes.map(make => (
            <option key={make.MakeId} value={make.MakeId}>{make.MakeName}</option>  
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block">Select Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 w-full text-black" 
        >
          <option value="">Choose a year</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>  
          ))}
        </select>
      </div>
      <Link
        href={`/result/${selectedMake}/${selectedYear}`}
        passHref
      >
        <button
          className={`mt-4 px-4 py-2 ${isButtonEnabled ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded`}
          disabled={!isButtonEnabled}
        >
          Next
        </button>
      </Link>
    </div>
  );
}
