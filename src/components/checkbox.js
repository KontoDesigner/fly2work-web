import React from 'react'

const Checkbox = ({ field, form, disabled, title = '' }) => (
    <label className="checkbox-label">
        <input
            checked={field.value}
            disabled={disabled}
            type="checkbox"
            name={field.name}
            value={field.value}
            onChange={event => form.setFieldValue(field.name, event.target.checked)}
            title={title}
        />
    </label>
)

export default Checkbox
