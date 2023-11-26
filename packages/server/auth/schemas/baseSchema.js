import * as Yup from 'yup';

export default Yup.object().shape({
  userName: Yup.string()
    .min(3)
    .max(255)
    .matches(/^[a-zA-Z0-9_-]+$/)
    .required(),
  password: Yup.string()
    .min(8)
    .max(255)
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/)
    .required(),
});
