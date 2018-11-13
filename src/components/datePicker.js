import Datetime from 'react-datetime'
import React from 'react'
import moment from 'moment'

const DatePicker = ({ field, form, setFieldTouched, disabled, dateFormat = 'YYYY-MM-DD' }) => {
    const onChange = date => {
        //Picker
        if (date._d) {
            return form.setFieldValue(field.name, date._d)
        }

        //Manual
        if (!date._d) {
            form.setFieldValue(field.name, date)

            return setFieldTouched(field.name, ' ')
        }
    }

    const val =
        field.value && field.value.length > 10 && moment(field.value, moment.ISO_8601, true).isValid()
            ? moment(field.value).format(dateFormat)
            : field.value

    return (
        <Datetime
            value={val}
            onChange={onChange}
            timeFormat={false}
            dateFormat={dateFormat}
            closeOnSelect
            utc={true}
            inputProps={{ placeholder: 'YYYY-MM-DD', disabled: disabled }}
            onBlur={() => setFieldTouched(field.name, ' ')}
        />
    )
}

export default DatePicker
