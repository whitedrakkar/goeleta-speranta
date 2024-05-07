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

    function handleValidate(invoice) {
        setLoading(true);
        validateInAnaf(invoice, (result) => {
            invoice.anafStatus.status = result.successful ? 'ValidatedOk' : 'ValidatedFail';
            setLoading(false);
        });
    }

    const validateInAnaf = async (invoice, refreshResult) => {
        try {
            const response = await fetch(new Request("http://127.0.0.2:8080/api/invoices/" + invoice.id + "/upload/validate", {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
                }
            }));

            const json = await response.json();
            refreshResult(json);
        } catch (error) {
            console.error(error);
        }
    }

    function handleUpload(invoice) {
        setLoading(true);
        uploadToAnaf(invoice, (result) => {
            invoice.anafStatus.status = result.successful ? 'UploadedOk' : 'UploadedFail';
            setLoading(false);
        });
    }

    const uploadToAnaf = async (invoice, refreshResult) => {
        try {
            const response = await fetch(new Request("http://127.0.0.2:8080/api/invoices/" + invoice.id + "/upload", {
                method: "PATCH",
                headers: {
                    'Accept': 'application/json',
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
                <div className='row' key='headers'>
                    <div className='col-sm'>Number</div>
                    <div className='col-sm'>Issue date</div>
                    <div className='col-3'>From</div>
                    <div className='col-3'>To</div>
                    <div className='col-sm'>Amount</div>
                    <div className='col-sm'>Anaf status</div>
                    <div className='col-sm'>Operations</div>
                </div>
                {
                    invoices.map((invoice, index) => {
                        return (
                            <div className='row' key={index}>
                                <div className='col-sm'>{invoice.number}</div>
                                <div className='col-sm'>{invoice.issueDate}</div>
                                <div className='col-3'>{invoice.supplier.name}</div>
                                <div className='col-3'>{invoice.customer.name}</div>
                                <div className='col-sm'>{invoice.totalAmount} {invoice.currency}</div>
                                <div className='col-sm'>{invoice.anafStatus?.status}</div>
                                <div className='col-sm'>
                                    {(invoice.anafStatus == null || invoice.anafStatus?.status === 'None' || invoice.anafStatus?.status === 'UploadedFail') && <button onClick={() => handleUpload(invoice)}>Upload</button>}
                                    {(invoice.anafStatus?.status === 'UploadedOk' || invoice.anafStatus?.status === 'ValidatedFail') && <button onClick={() => handleValidate(invoice)}>Validate</button>}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}