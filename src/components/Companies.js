import { useEffect, useState } from 'react';

import { Routes, Route, Outlet, useNavigate } from "react-router-dom";

import { CompaniesList } from './CompaniesList.js';
import { CompanyAdd } from './CompanyAdd.js';
import { CompanyEdit } from './CompanyEdit.js';
import { CompanyView } from './CompanyView.js';

export function Companies() {

    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
        setLoading(true);
        addNewCompany(company, (result) => {
            if (result.successful) {
                company.id = result.id;
                const updatedCompanies = [...companies, company];
                setCompanies(updatedCompanies);

                let path = '/companies/' + company.id + '/view';
                navigate(path, { replace: true });
            }
            setLoading(false);
        });
    }

    function handleEdit(company) {

        /* onAddNew(company); */
    }

    const addNewCompany = async (company, refreshResult) => {
        try {
            const response = await fetch(new Request("http://127.0.0.2:8080/api/companies", {
                method: "POST",
                body: JSON.stringify(company),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }));

            const json = await response.json();
            refreshResult(json);
        } catch (error) {
            console.error(error);
        }
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