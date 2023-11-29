import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { signInWithGooglePopup, signInWithEmailPassword } from '../../firebase';
import { loginUser } from '../../services/api';
import InputBlock from '../../UI/inputForAuth/InputBlock';
import Button from '../../UI/buttonForAuth/Button';

function LoginPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, 'Мінімальний розмір 4 символів')
        .required("Обов'язкове поле"),
      password: Yup.string()
        .min(6, 'Мінімальна довжина паролю - 6 символів')
        .required('Потрібно вказати пароль'),
    }),
    onSubmit: async ({ userName, password }) => {
      try {
        const response = await loginUser({ userName, password });
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/languages');
        /////////////////////////////////////////////////////
        // const res = await signInWithEmailPassword(userName, password);
        // localStorage.setItem('token', res.user.accessToken);
        // navigate('/languages');
        /////////////////////////////////////////////////////
      } catch (e) {
        console.log(e);
      } finally {
        formik.resetForm({ userName: '', password: '' });
      }
    },
  });

  async function signInWithgoogle() {
    const res = await signInWithGooglePopup();
    const token = await res.user.accessToken;
    localStorage.setItem('token', token);
    navigate('/languages');
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-60 sm:w-64 md:w-80 xl:w-96 p-4 xl:p-6 bg-slate-100 rounded-md shadow-2xl">
        <h1 className="text-md sm:text-lg md:text-xl lg:text-2xl xl:text-3xl block text-center font-semubold">
          Login
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
          <Button type="submit" buttonText="Sing in" />
        </form>
        {/* <Button buttonText="Sign in with google" onClick={signInWithgoogle} /> */}
        <Link
          to="/register"
          className="mt-1 md:mt-3 hover:text-cyan-700 text-xs sm:text-sm md:text-base"
        >
          Do not have account? - Sing up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
