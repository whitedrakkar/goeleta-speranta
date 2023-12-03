import { Companies } from './Companies.js';
import { AddCompany } from './AddCompany.js';
import { useEffect, useState } from 'react';

export default function Main() {

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('http://127.0.0.2:8080/api/companies')
      .then(response => {
        return response.json();
      }
      )
      .then(data => {
        setCompanies(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  function handleAddNew(company) {
    const updatedCompanies = [...companies, company];
    setCompanies(updatedCompanies);
  }

  return (
    <div >
      <div >
        <Companies companies={companies} />
      </div>
      <div >
        <AddCompany onAddNew={handleAddNew} />
      </div>
    </div>
  );
}
