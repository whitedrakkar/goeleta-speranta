import { Companies } from './Companies.js';
import { AddCompany } from './AddCompany.js';
import { useState } from 'react';

export default function Main() {

  const [companies, setCompanies] = useState([]);

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
