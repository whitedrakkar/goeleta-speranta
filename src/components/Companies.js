import { useEffect, useState } from 'react';

import { Routes, Route, Outlet } from "react-router-dom";

import { CompaniesList } from './CompaniesList.js';
import { CompanyAdd } from './CompanyAdd.js';
import { CompanyEdit } from './CompanyEdit.js';
import { CompanyView } from './CompanyView.js';

export function Companies() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let ignore = false;

        setLoading(true);
        fetch('http://127.0.0.2:8080/api/companies/min')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (!ignore) {
                    setCompanies(data);
                    setLoading(false);
                }
            });

        return () => {
            ignore = true;
        };
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    function handleAddNew(company) {
        const updatedCompanies = [...companies, company];
        setCompanies(updatedCompanies);
    }

    function handleEdit(company) {

        /* onAddNew(company); */
    }

    return (
        <>

            <Routes>
                <Route index element={<CompaniesList companies={companies} />} />
                <Route path="new" element={<CompanyAdd onAddNew={handleAddNew} />} />
                <Route path=":id/edit" element={<CompanyEdit />} />
                <Route path=":id/view" element={<CompanyView />} />
            </Routes>

            <Outlet />
        </>
    )
}