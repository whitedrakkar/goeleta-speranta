import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

import { LabelAndTextInput } from './LabelAndTextInput.js';
import { Dropdown } from './Dropdown.js';

export function CompanyEdit({ onEdit }) {

    let { id } = useParams();
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [county, setCounty] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
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
            })
            .then(data => {
                setName(data.name);
                setCountry(data.country);
                setCounty(data.county ?? '');
                setCity(data.city ?? '');
                setStreet(data.street ?? '');
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
            country: country,
            county: county,
            city: city,
            street: street,
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
                <LabelAndTextInput value={cif} label="CIF" onUpdate={setCif}></LabelAndTextInput>
                <LabelAndTextInput value={euVatNumber} label="RO" onUpdate={setEuVatNumber}></LabelAndTextInput>
                <LabelAndTextInput value={legalId} label="J" onUpdate={setLegalId}></LabelAndTextInput>
                <Dropdown value={country} label="Country" onUpdate={setCountry} options={[{ key: 'Romania', name: 'Romania' }, { key: 'Hungary', name: 'Hungary' }, { key: 'Poland', name: 'Poland' }]}></Dropdown>
                <Dropdown value={county} label="County" onUpdate={setCounty} options={[{ key: '', name: '' }, { key: 'Cluj', name: 'Cluj' }, { key: 'Bucuresti', name: 'Bucuresti' }, { key: 'Mures', name: 'Mures' }, { key: 'Harghita', name: 'Harghita' }]}></Dropdown>
                <LabelAndTextInput value={city} label="City" onUpdate={setCity}></LabelAndTextInput>
                <LabelAndTextInput value={street} label="Street" onUpdate={setStreet}></LabelAndTextInput>
                <LabelAndTextInput value={phone} label="Phone" onUpdate={setPhone}></LabelAndTextInput>
                <LabelAndTextInput value={email} label="E-mail" onUpdate={setEmail}></LabelAndTextInput>
                <Dropdown value={taxCategory} label="Tax category" onUpdate={setTaxCategory} options={[{ key: 'NotRegisteredForVAT', name: 'Not registered for VAT' }, { key: 'Standard', name: 'Standard' }]}></Dropdown>
            </form>
            <div>
                <button onClick={handleEdit}>Save</button>
                <button onClick={() => navigate(-1)}>Back</button>
            </div>

        </>
    )
}