import React from 'react'
import ReactSelect from 'react-select'

const MultiSelect = ({ options, field, form, setFieldTouched }) => (
    <ReactSelect
        options={options}
        name={field.name}
        value={options ? options.find(option => option.value === field.value) : ''}
        onChange={option => form.setFieldValue(field.name, option)}
        onBlur={() => setFieldTouched(field.name, ' ')}
        isMulti
    />
)

export default MultiSelect
