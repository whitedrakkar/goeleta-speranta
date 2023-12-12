import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CompaniesList } from './CompaniesList.js';

export function Companies() {

    const navigate = useNavigate();
    
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(`/something/`);
    }, []);

    useEffect(() => {
        let ignore = false;

        setLoading(true);
        console.log("test");
        fetch('http://127.0.0.2:8080/api/companies')
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

    function navigateToAddNew() {
        navigate('/companies/new', { replace: true });
    }

    return (
        <>
            <div>
                <button onClick={() => navigateToAddNew()} > Add new </button>
            </div>
            <CompaniesList companies={companies}></CompaniesList>
        </>
    )
}