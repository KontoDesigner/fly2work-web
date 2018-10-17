import React from 'react'

const Gender = ({ field, form }) => (
    <div className="gender">
        <div>
            <label htmlFor="gender">Man</label>

            <label>
                <input
                    onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                    checked={field.value === 'M'}
                    type="radio"
                    value="M"
                    name="gender"
                    id="papa"
                />
            </label>
        </div>

        <div>
            <label htmlFor="gender">Woman</label>

            <label>
                <input
                    onChange={event => form.setFieldValue(field.name, event.currentTarget.value)}
                    checked={field.value === 'W'}
                    type="radio"
                    value="W"
                    name="gender"
                    id="mama"
                />
            </label>
        </div>
    </div>
)

export default Gender
