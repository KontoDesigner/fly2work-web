import React from 'react'
import CreatableSelect from 'react-select/lib/Creatable'

const Creatable = ({ field, form, setFieldTouched, noOptionsMessage, disabled }) => {
    const value = field.value
        ? field.value.map(function(item) {
              return { value: item, label: item }
          })
        : []

    const onChange = option => {
        const val = option.map(function(item) {
            return item['value']
        })

        form.setFieldValue(field.name, val)
    }

    return (
        <CreatableSelect
            isDisabled={disabled}
            isMulti
            name={field.name}
            value={value}
            onChange={option => onChange(option)}
            onBlur={() => setFieldTouched(field.name, ' ')}
            noOptionsMessage={() => noOptionsMessage}
        />
    )
}

export default Creatable
