import * as Yup from 'yup';

export default Yup.object().shape({
  userName: Yup.string()
    .min(4, 'Мінімальна довжина логіну - 4 символи!')
    .required('Потрібно вказати логін!'),
  password: Yup.string()
    .min(8, 'Мінімальна довжина паролю - 6 символів!')
    .max(255, 'Максимальна довжина паролю - 255 символів!')
    .required('Потрібно вказати пароль!'),
});
