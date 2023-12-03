import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { createWithEmailPassword } from '../../firebase';
import { registerUser } from '../../services/api';
import InputBlock from '../../UI/inputForAuth/InputBlock';
import Button from '../../UI/buttonForAuth/Button';

function RegistrationPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      repPassword: '',
      userName: '',
      userEmail: '',
      password: '',
    },
    validationSchema: Yup.object({
      repPassword: Yup.string()
        .min(2, 'Мінімальний розмір 2 символи!')
        .required("Потрібно вказати ім'я користувача!")
        .oneOf([Yup.ref('password'), null], 'Паролі повинні співпадати!'),
      userName: Yup.string()
        .min(4, 'Мінімальна довжина логіну - 4 символи!')
        .required('Потрібно вказати логін!'),
      userEmail: Yup.string()
        .email('Потрібно вказати валідний email адрес!')
        .max(255, 'Розмір не може перевищувати 255 символів!')
        .required('Потрібно вказати email!'),
      password: Yup.string()
        .min(6, 'Мінімальна довжина паролю - 6 символів!')
        .max(255, 'Максимальна довжина паролю - 255 символів!')
        .required('Потрібно вказати пароль!'),
    }),
    onSubmit: async ({ userName, userEmail, password }) => {
      try {
        const fData = { userName, userEmail, password };
        const response = await registerUser(fData);
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/languages');

        ///////////////////////////////////////////////////
        // const res = await createWithEmailPassword(userEmail, password);
        // localStorage.setItem('token', res.user.accessToken);
        // navigate('/languages');
        ///////////////////////////////////////////////////
      } catch (e) {
        console.log(e);
      } finally {
        formik.resetForm({
          userName: '',
          userEmail: '',
          password: '',
          repPassword: '',
        });
      }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-60 sm:w-64 md:w-80 xl:w-96 p-4 xl:p-6 bg-slate-100 rounded-md shadow-2xl">
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl block text-center font-semubold">
          Sign up
        </h1>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <InputBlock
            lableHtmlFor={'userName'}
            lableText={'User login'}
            inputType={'text'}
            inputName={'userName'}
            inputPlaceholder={'Enter Login...'}
            inputValue={formik.values.userName}
            onChange={formik.handleChange}
            error={
              formik.errors.userName && formik.touched.userName ? (
                <div>{formik.errors.userName}</div>
              ) : null
            }
          />
          <InputBlock
            lableHtmlFor={'userEmail'}
            lableText={'Email'}
            inputType={'email'}
            inputName={'userEmail'}
            inputPlaceholder={'Enter email...'}
            inputValue={formik.values.userEmail}
            onChange={formik.handleChange}
            error={
              formik.errors.userEmail && formik.touched.userEmail ? (
                <div>{formik.errors.userEmail}</div>
              ) : null
            }
          />
          <InputBlock
            lableHtmlFor={'password'}
            lableText={'Password'}
            inputType={'password'}
            inputName={'password'}
            inputPlaceholder={'Enter Password...'}
            inputValue={formik.values.password}
            onChange={formik.handleChange}
            error={
              formik.errors.password && formik.touched.password ? (
                <div>{formik.errors.password}</div>
              ) : null
            }
          />
          <InputBlock
            lableHtmlFor={'repPassword'}
            lableText={'Repeat password'}
            inputType={'text'}
            inputName={'password'}
            inputPlaceholder={'Enter password again...'}
            inputValue={formik.values.repPassword}
            onChange={formik.handleChange}
            error={
              formik.errors.repPassword && formik.touched.repPassword ? (
                <div>{formik.errors.repPassword}</div>
              ) : null
            }
          />
          <Button type="submit" buttonText="Sing up" />
        </form>
        <Link
          to="/login"
          className="mt-1 md:mt-3 hover:text-cyan-700 text-xs sm:text-sm md:text-base"
        >
          Already have account? - Sing in
        </Link>
      </div>
    </div>
  );
}

export default RegistrationPage;
