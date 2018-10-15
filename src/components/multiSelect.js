import React from 'react'
import ReactSelect from 'react-select'

const MultiSelect = ({ options, field, form }) => (
  <ReactSelect
    options={options}
    name={field.name}
    value={options ? options.find(option => option.value === field.value) : ''}
    onChange={option => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
    isMulti
  />
)

export default MultiSelect
