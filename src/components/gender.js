import React from 'react'

const styles = {
    label: {
        display: 'inline-block',
        padding: '10px 0',
        marginBottom: '0px',
        marginRight: '15px'
    },
    input: {
        marginLeft: '5px'
    }
}

const Gender = ({ field, form, disabled, setFieldTouched }) => (
    <div>
        <label style={styles.label}>
            Man
            <input
                onBlur={() => setFieldTouched(field.name, ' ')}
                style={styles.input}
                disabled={disabled}
                onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                checked={field.value === 'M'}
                type="radio"
                value="M"
                name="gender"
                id="papa"
            />
        </label>

        <label style={styles.label}>
            Woman
            <input
                onBlur={() => setFieldTouched(field.name, ' ')}
                style={styles.input}
                disabled={disabled}
                onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                checked={field.value === 'W'}
                type="radio"
                value="W"
                name="gender"
                id="mama"
            />
        </label>
    </div>
)

export default Gender
