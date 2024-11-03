"use client"
import React, { useEffect, useState } from 'react';

const ModelList = ({ makeId, year }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
        const data = await response.json();
        setModels(data.Results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (makeId && year) fetchModels();
  }, [makeId, year]);

  if (loading) return <div>Loading models...</div>;
  if (error) return <div>Error fetching models: {error.message}</div>;

  return (
    <ul className="mt-4">
      {models.length ? (
        models.map(model => (
          <li key={model.Model_ID} className="border-b py-2">{model.Model_Name}</li>
        ))
      ) : (
        <p className="mt-4">No models found for the selected make and year.</p>
      )}
    </ul>
  );
};

export default ModelList;
