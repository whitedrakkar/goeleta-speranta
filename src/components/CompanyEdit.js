import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { LabelAndTextInput } from './LabelAndTextInput.js';
import { Dropdown } from './Dropdown.js';

export function CompanyEdit({ onEdit }) {

    let { id } = useParams();
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [cif, setCif] = useState('')
    const [euVatNumber, setEuVatNumber] = useState('')
    const [legalId, setLegalId] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [taxCategory, setTaxCategory] = useState('Standard')

    useEffect(() => {
        setLoading(true);

        fetch('http://127.0.0.2:8080/api/companies/' + id)
            .then(response => {
                return response.json();
            }
            )
            .then(data => {
                setName(data.name);
                setAddress(data.city + ' ' + data.street + ', ' + data.county + ', ' + data.country);
                setCif(data.cif ?? '');
                setEuVatNumber(data.euVatNumber ?? '');
                setLegalId(data.legalId ?? '');
                setPhone(data.phone ?? '');
                setEmail(data.email ?? '');
                setTaxCategory(data.taxCategory);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    function handleEdit() {

        let company = {
            name: name,
            address: address,
            cif: cif,
            euVatNumber: euVatNumber,
            legalId: legalId,
            phone: phone,
            email: email,
            taxCategory: taxCategory
        }
        onEdit(company);
    }

    return (
        <>
            <form>
                <LabelAndTextInput value={name} label="Name" onUpdate={setName}></LabelAndTextInput>
                <LabelAndTextInput value={address} label="Address" onUpdate={setAddress}></LabelAndTextInput>
                <LabelAndTextInput value={cif} label="CIF" onUpdate={setCif}></LabelAndTextInput>
                <LabelAndTextInput value={euVatNumber} label="RO" onUpdate={setEuVatNumber}></LabelAndTextInput>
                <LabelAndTextInput value={legalId} label="J" onUpdate={setLegalId}></LabelAndTextInput>
                <LabelAndTextInput value={phone} label="Phone" onUpdate={setPhone}></LabelAndTextInput>
                <LabelAndTextInput value={email} label="E-mail" onUpdate={setEmail}></LabelAndTextInput>
                <Dropdown value={taxCategory} label="Tax category" onUpdate={setTaxCategory}></Dropdown>
            </form>
            <div>
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

        </>
    )
}