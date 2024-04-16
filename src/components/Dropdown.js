import React from 'react';

export function Dropdown({ value, label, onUpdate, options }) {

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
                    {options.map(function (option, i) {
                        return (<option value={option.key} key={i}>
                            {option.name}
                        </option>);
                    })}

                </select>
            </div>
        </>
    )
}