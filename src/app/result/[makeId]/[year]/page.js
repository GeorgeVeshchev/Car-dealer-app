'use client'; 

import { useEffect, useState } from 'react';
import { use } from 'react';

export default function ResultPage({ params }) {

  const { makeId, year } = use(params);

  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
      const data = await response.json();
      setModels(data.Results);
      setLoading(false);
    };

    fetchModels();
  }, [makeId, year]);

  if (loading) {
    return <div className="container mx-auto p-4 text-white">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Marks auto</h1>
      <ul>
        {models.map((model) => (
          <li key={model.Model_ID} className="mb-2 p-2 bg-gray-800 rounded">{model.Model_Name}</li>
        ))}
      </ul>
    </div>
  );
}
