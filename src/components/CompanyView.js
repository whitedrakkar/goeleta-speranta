import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

export function CompanyView({ companyId }) {

    let { id } = useParams();
    let navigate = useNavigate();

    const [company, setCompany] = useState({});
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);

    loadInitialData();

    function loadInitialData() {

        useEffect(() => {
            setLoading(true);
            let path = id ? 'http://127.0.0.2:8080/api/companies/' + id : 'http://127.0.0.2:8080/api/companies?cif=' + companyId;
            fetch(path)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    setCompany(data);
                    return data.id;
                })
                .then(returnedId => {
                    fetch('http://127.0.0.2:8080/api/companies/' + returnedId + "/invoices")
                        .then(response => {
                            return response.json();
                        })
                        .then(data => {
                            setInvoices(data);
                            setLoading(false);
                        })
                })
        }, []);

        if (loading) {
            return <p>Loading...</p>;
        }
    }

    function handleEdit() {
        let path = '/companies/' + company.id + '/edit';
        navigate(path, { replace: true });
    }

    return (
        <>
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>
            <div>
                <button onClick={() => handleEdit()}>Edit</button>
            </div>
            <div>Name: {company.name}</div>
            <div>Legal Id: {company.legalId}</div>
            <div>CIF: {company.cif}</div>
            <div>EU VAT nr.: {company.euVatNumber}</div>
            <div>Tax category: {company.taxCategory}</div>
            <div>Address: {company.city} {company.street}, {company.county}, {company.country}</div>


            <div>Invoices</div>
            <div className='container'>
                {
                    invoices.map((invoice, index) => {
                        return (
                            <div className='row' key={index}>
                                <div className='col-sm'>{invoice.number}</div>
                                <div className='col-sm'>{invoice.issueDate}</div>
                                <div className='col-sm'>{invoice.dueDate}</div>
                                <div className='col-3'>{invoice.supplier.name}</div>
                                <div className='col-3'>{invoice.customer.name}</div>
                                <div className='col-sm'>{invoice.totalAmount} {invoice.currency}</div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}