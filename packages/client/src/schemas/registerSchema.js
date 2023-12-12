import * as Yup from 'yup';

import baseAuthSchema from './baseAuthSchema';

export default baseAuthSchema.shape({
  repPassword: Yup.string()
    .min(8, 'Мінімальний розмір 2 символи!')
    .required('Потрібно ввести пароль повторно!')
    .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати!'),
  userEmail: Yup.string()
    .email('Потрібно вказати валідний email адрес!')
    .max(255, 'Розмір не може перевищувати 255 символів!')
    .required('Потрібно вказати email!'),
});
