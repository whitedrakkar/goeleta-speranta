import React from 'react';

export function Dropdown({ value, label, onUpdate, options }) {

    const id = React.useId();
    const fieldId = `${id}-${label}`;

    return (
        <div class="form-group row">
            <label class="col-sm-1 col-form-label" htmlFor={fieldId}>{label}:</label>
            <div class="col-sm-4">
                <select
                    id={fieldId}
                    value={value}
                    class="form-control form-control-sm"
                    onChange={event => {
                        onUpdate(event.target.value);
                    }}
                >
                    {options.map(function (option, i) {
                        return (<option value={option.key} key={i}>
                            {option.name}
                        </option>);
                    })}

                </select></div>
        </div>
    )
}