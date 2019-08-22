import React from 'react'
import ReactSelect from 'react-select'

const Select = ({ options, field, form, setFieldTouched, disabled, valueKey, labelKey, isClearable = false }) => (
    <ReactSelect
        className={`select ${disabled === true ? 'disabled' : ''}`}
        isDisabled={disabled}
        options={options}
        name={field.name}
        value={options ? options.find(option => option[valueKey] === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option ? option[valueKey] : null)}
        onBlur={() => setFieldTouched(field.name, ' ')}
        getOptionLabel={option => option[labelKey]}
        getOptionValue={option => option[valueKey]}
        isClearable={isClearable}
        isOptionDisabled={option => option.disabled === 'yes'}
    />
)

export default Select
