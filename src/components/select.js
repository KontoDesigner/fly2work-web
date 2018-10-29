import React from 'react'
import ReactSelect from 'react-select'

const Select = ({ options, field, form, setFieldTouched, disabled, valueKey, labelKey }) => (
    <ReactSelect
        isDisabled={disabled}
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option.value)}
        onBlur={() => setFieldTouched(field.name, ' ')}
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
    />
)

export default Select
