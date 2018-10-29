import React from 'react'
import ReactSelect from 'react-select'

const MultiSelect = ({ options, field, form, setFieldTouched, disabled, valueKey, labelKey }) => (
    <ReactSelect
        disabled={disabled}
        options={options}
        name={field.name}
        value={options ? options.find(option => option[valueKey] === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option)}
        onBlur={() => setFieldTouched(field.name, ' ')}
        isMulti
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
    />
)

export default MultiSelect
