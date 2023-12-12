import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

// import { createWithEmailPassword } from '../../firebase';
import { registerUser } from '../../services/api';
import registerSchema from '../../schemas/registerSchema';
import InputBlock from '../../UI/inputForAuth/InputBlock';
import Button from '../../UI/buttonForAuth/Button';

export default function formikRegistration() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      repPassword: '',
      userName: '',
      userEmail: '',
      password: '',
    },
    validationSchema: registerSchema,
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
        /* eslint-disable */
        console.log(e);
        /* eslint-enable */
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
      <>
        <InputBlock
          lableHtmlFor={'repPassword'}
          lableText={'Repeat password'}
          inputType={'password'}
          inputName={'repPassword'}
          onChange={formik.handleChange}
          inputPlaceholder={'Enter password again...'}
          inputValue={formik.values.repPassword}
          error={
            formik.errors.repPassword && formik.touched.repPassword ? (
              <div>{formik.errors.repPassword}</div>
            ) : null
          }
        />
        <InputBlock
          lableHtmlFor={'userEmail'}
          lableText={'Email'}
          inputType={'email'}
          inputName={'userEmail'}
          inputPlaceholder={'Enter email...'}
          onChange={formik.handleChange}
          inputValue={formik.values.userEmail}
          error={
            formik.errors.userEmail && formik.touched.userEmail ? (
              <div>{formik.errors.userEmail}</div>
            ) : null
          }
        />
      </>
      <Button type="submit" buttonText="Sing up" />
      {/* {putGoogleAuthOnPage ? (
            <Button
              buttonText={isLoginPage ? 'Sing in google' : 'Sing up google'}
              onClick={googleAuthFunction}
            />
          ) : null} */}
    </form>
  );
}
