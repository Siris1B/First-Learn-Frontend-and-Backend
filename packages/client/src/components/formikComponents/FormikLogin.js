import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// import { signInWithGooglePopup, signInWithEmailPassword } from '../../firebase';
import { loginUser } from '../../services/api';
import loginSchema from '../../schemas/loginSchema';
import InputBlock from '../../UI/inputForAuth/InputBlock';
import Button from '../../UI/buttonForAuth/Button';

export default function formikLogin() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: loginSchema,
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
        /* eslint-disable */
        console.log(e);
        /* eslint-enable */
      } finally {
        formik.resetForm({ userName: '', password: '' });
      }
    },
  });

  // async function signInWithgoogle() {
  //   const res = await signInWithGooglePopup();
  //   const token = await res.user.accessToken;
  //   localStorage.setItem('token', token);
  //   navigate('/languages');
  // }

  return (
    <>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <InputBlock
          lableHtmlFor={'userName'}
          lableText={'User login'}
          inputType={'text'}
          inputName={'userName'}
          onChange={formik.handleChange}
          inputPlaceholder={'Enter Login...'}
          inputValue={formik.values.userName}
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
          onChange={formik.handleChange}
          inputValue={formik.values.password}
          error={
            formik.errors.password && formik.touched.password ? (
              <div>{formik.errors.password}</div>
            ) : null
          }
        />
        <Button type="submit" buttonText="Sing in" />
        {/* <Button
          type="button"
          buttonText="Sing in google"
          onClick={signInWithgoogle}
        /> */}
      </form>
    </>
  );
}
