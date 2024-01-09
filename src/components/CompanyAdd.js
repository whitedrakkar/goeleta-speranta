import { useState } from 'react';
import { LabelAndTextInput } from './LabelAndTextInput.js';
import { Dropdown } from './Dropdown.js';
import { Link } from 'react-router-dom';

export function CompanyAdd({ onAddNew }) {

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [cif, setCif] = useState('')
    const [euVatNumber, setEuVatNumber] = useState('')
    const [legalId, setLegalId] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [taxCategory, setTaxCategory] = useState('Standard')

    function handleAddNew() {

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
        onAddNew(company);
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
            <div >
                <button class="btn btn-link" onClick={handleAddNew}>Create</button>
                <Link class="btn btn-link" to="/companies">Back</Link>
            </div>
            
        </>
    )
}