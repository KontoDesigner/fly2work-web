import Datetime from 'react-datetime'
import React from 'react'

const DatePicker = ({ field, form }) => {
    const onChange = date => {
        //Picker
        if (date._d) {
            form.setFieldValue(field.name, date._d)
        }

        //Manual
        if (!date._d) {
            form.setFieldValue(field.name, date)
        }
    }

    return (
        <Datetime
            value={field.value}
            onChange={onChange}
            timeFormat={false}
            dateFormat="YYYY-MM-DD"
            closeOnSelect
            utc={true}
            inputProps={{ placeholder: 'YYYY-MM-DD' }}
        />
    )
}

export default DatePicker
