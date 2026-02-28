import { useState } from 'react';
import { LabelAndTextInput } from './LabelAndTextInput.js';
import { Dropdown } from './Dropdown.js';
import { Link } from 'react-router-dom';

export function CompanyAdd({ onAddNew }) {

    const [name, setName] = useState('')
    const [country, setCountry] = useState('Romania')
    const [county, setCounty] = useState('')
    const [city, setCity] = useState('')
    const [street, setStreet] = useState('')
    const [cif, setCif] = useState('')
    const [euVatNumber, setEuVatNumber] = useState('')
    const [legalId, setLegalId] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [taxCategory, setTaxCategory] = useState('Standard')

    function handleAddNew() {

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
        onAddNew(company);
    }

    return (
        <>
            <form>
                <LabelAndTextInput value={name} label="Name" readonly={false} onUpdate={setName}></LabelAndTextInput>
                <LabelAndTextInput value={cif} label="CIF" readonly={false} onUpdate={setCif}></LabelAndTextInput>
                <LabelAndTextInput value={euVatNumber} label="EU VAT nr." readonly={false} onUpdate={setEuVatNumber}></LabelAndTextInput>
                <LabelAndTextInput value={legalId} label="Legal Id" readonly={false} onUpdate={setLegalId}></LabelAndTextInput>
                <Dropdown value={country} label="Country" readonly={false} onUpdate={setCountry} options={[{ key: 'Romania', name: 'Romania' }, { key: 'Hungary', name: 'Hungary' }, { key: 'Poland', name: 'Poland' }]}></Dropdown>
                <Dropdown value={county} label="County" readonly={false} onUpdate={setCounty} options={[{ key: '', name: '' }, { key: 'Bucuresti', name: 'Bucuresti' }, { key: 'Cluj', name: 'Cluj' }, { key: 'Covasna', name: 'Covasna' }, { key: 'Harghita', name: 'Harghita' }, { key: 'Mures', name: 'Mures' }]}></Dropdown>
                <LabelAndTextInput value={city} label="City" readonly={false} onUpdate={setCity}></LabelAndTextInput>
                <LabelAndTextInput value={street} label="Street" readonly={false} onUpdate={setStreet}></LabelAndTextInput>
                <LabelAndTextInput value={phone} label="Phone" readonly={false} onUpdate={setPhone}></LabelAndTextInput>
                <LabelAndTextInput value={email} label="E-mail" readonly={false} onUpdate={setEmail}></LabelAndTextInput>
                <Dropdown value={taxCategory} label="Tax category" readonly={false} onUpdate={setTaxCategory} options={[{ key: 'NotRegisteredForVAT', name: 'Not registered for VAT' }, { key: 'Standard', name: 'Standard' }]}></Dropdown>
            </form>
            <div>
                <button className="btn btn-primary" onClick={handleAddNew}>Create</button>
                <Link className="btn btn-primary" to="/companies">Back</Link>
            </div>

        </>
    )
}