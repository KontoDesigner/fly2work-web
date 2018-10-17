import React from 'react'

const Checkbox = ({ field, form }) => (
    <label className="checkbox-label">
        <input type="checkbox" name={field.name} value={field.value} onChange={event => form.setFieldValue(field.name, event.target.checked)} />
    </label>
)

export default Checkbox
