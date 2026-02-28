import React from 'react';

export function LabelAndTextInput({ value, label, readonly, onUpdate }) {

    const id = React.useId();
    const fieldId = `${id}-${label}`;

    return (
        <div class="form-group row">
            <label class="col-sm-1 col-form-label" htmlFor={fieldId}>{label}:</label>
            <div class="col-sm-4">
                <input
                    type="text"
                    class="form-control form-control-sm"
                    id={fieldId}
                    value={value}
                    readOnly={readonly}
                    onChange={event => {
                        onUpdate(event.target.value);
                    }}
                />
            </div>
        </div>
    )
}