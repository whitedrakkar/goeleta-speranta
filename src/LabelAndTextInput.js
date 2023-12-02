import React from 'react';

export function LabelAndTextInput({ value, label, onUpdate }) {

    const id = React.useId();
    const fieldId = `${id}-${label}`;

    return (
        <>
            <div className='row'>
                <label htmlFor={fieldId}>
                    {label}:
                </label>
                <input
                    id={fieldId}
                    value={value}
                    onChange={event => {
                        onUpdate(event.target.value);
                    }}
                />
            </div>
        </>
    )
}