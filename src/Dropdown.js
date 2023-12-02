import React from 'react';

export function Dropdown({ value, label, onUpdate }) {

    const id = React.useId();
    const fieldId = `${id}-${label}`;

    return (
        <>
            <div className='row'>
                <label htmlFor={fieldId}>
                    {label}:
                </label>
                <select
                    id={fieldId}
                    value={value}
                    onChange={event => {
                        onUpdate(event.target.value);
                    }}
                >
                    <option value="NotRegisteredForVAT">
                        Not registered for VAT
                    </option>
                    <option value="Standard">
                        Standard
                    </option>
                </select>
            </div>
        </>
    )
}