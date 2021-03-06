import Datetime from 'react-datetime'
import React from 'react'
import moment from 'moment'

const DatePicker = ({ field, form, setFieldTouched, disabled, dateFormat = 'DD/MM/YYYY', timeFormat = false }) => {
    const onChange = date => {
        //Picker
        if (date._d) {
            return form.setFieldValue(field.name, moment(date._d).format(timeFormat === false ? dateFormat : timeFormat))
        }

        //Manual
        if (!date._d) {
            form.setFieldValue(field.name, date)

            return setFieldTouched(field.name, ' ')
        }
    }

    const val =
        field.value && field.value.length > 10 && moment(field.value, moment.ISO_8601, true).isValid()
            ? moment(field.value).format(timeFormat === false ? dateFormat : timeFormat)
            : field.value

    return (
        <Datetime
            value={val}
            onChange={onChange}
            timeFormat={timeFormat}
            dateFormat={dateFormat}
            closeOnSelect
            utc={false}
            inputProps={{ placeholder: timeFormat !== false ? timeFormat : dateFormat, disabled: disabled }}
            onBlur={() => setFieldTouched(field.name, ' ')}
        />
    )
}

export default DatePicker
