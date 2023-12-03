import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

import { registerUser } from '../../services/api';

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
        console.log(response);
        const { token } = response.data;
        localStorage.setItem('token', token);
        navigate('/languages');
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
      <div className="w-96 p-6 bg-slate-100 rounded-md shadow-2xl">
        <h1 className="text-3xl block text-center font-semubold">Sign up</h1>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <label htmlFor="userName" className="block text-base mb-2">
              Login
            </label>
            {/*  */}
            <input
              type="text"
              name="userName"
              placeholder="Enter Login..."
              className="input input-bordered w-full "
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {/*  */}
            {formik.errors.userName && formik.touched.userName ? (
              <div>{formik.errors.userName}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <label htmlFor="userEmail" className="block text-base mb-2">
              Email
            </label>
            {/*  */}
            <input
              type="text"
              name="userEmail"
              placeholder="Enter email..."
              className="input input-bordered w-full "
              value={formik.values.userEmail}
              onChange={formik.handleChange}
            />
            {/*  */}
            {formik.errors.userEmail && formik.touched.userEmail ? (
              <div>{formik.errors.userEmail}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            {/*  */}
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              className="input input-bordered w-full "
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {/*  */}
            {formik.errors.password && formik.touched.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mt-3">
            <label htmlFor="repPassword" className="block text-base mb-2">
              Repeat password
            </label>
            {/*  */}
            <input
              type="text"
              name="repPassword"
              placeholder="Enter password again..."
              className="input input-bordered w-full "
              value={formik.values.repPassword}
              onChange={formik.handleChange}
            />
            {/*  */}
            {formik.errors.repPassword && formik.touched.repPassword ? (
              <div>{formik.errors.repPassword}</div>
            ) : null}
          </div>
          {/*  */}
          <button type="submit" className="btn btn-primary mt-3 w-full">
            Sing up
          </button>
          {/*  */}
        </form>
        <Link to="/login">Already have account? - Sing in</Link>
      </div>
    </div>
  );
}

export default RegistrationPage;
