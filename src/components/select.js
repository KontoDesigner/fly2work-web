import React from 'react'
import ReactSelect from 'react-select'

const Select = ({ options, field, form, setFieldTouched, defaultValue = null, disabled }) => (
    <ReactSelect
        isDisabled={disabled}
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option.value)}
        onBlur={() => setFieldTouched(field.name, ' ')}
        defaultValue={defaultValue}
    />
)

export default Select
