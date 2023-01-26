import * as yup from 'yup'

const getPasswordValidation = () =>
  yup
    .string()
    .required('This field is required')
    .min(8, 'A password must be at least 8 characters')
    .matches(
      /^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*",\-_()ǀǁ={}№:\];~\\<>?/'`]).{8,40})$/,
      'A password should contain at least one digit, one uppercase, one special, and one lowercase characters.'
    )

export const schema = yup.object({
  email: yup.string().email('This is not a valid email address').max(255).required('Enter your email'),
  password: getPasswordValidation(),
  confirmPassword: getPasswordValidation().oneOf([yup.ref('password'), null], 'Passwords do not match'),
})
