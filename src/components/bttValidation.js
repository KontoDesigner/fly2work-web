import * as Yup from 'yup'
import bsValidation from './bsValidation'

const bttValidation = Yup.object().shape({
    test: Yup.string()
        .nullable(true)
        .required('Test is required')
})

const combined = bsValidation.concat(bttValidation)

export default combined
