import React from 'react'
import ReactSelect from 'react-select'

const Select = ({ options, field, form, setFieldTouched, disabled, valueKey, labelKey }) => (
    <ReactSelect
        className={'select'}
        isDisabled={disabled}
        options={options}
        name={field.name}
        value={options ? options.find(option => option[valueKey] === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option[valueKey])}
        onBlur={() => setFieldTouched(field.name, ' ')}
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
    />
)

export default Select
