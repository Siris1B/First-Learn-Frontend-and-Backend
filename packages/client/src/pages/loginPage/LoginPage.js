import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(4, "Мінімальний розмір 4 символів")
        .required("Обов'язкове поле"),
      password: Yup.string()
        .min(6, "Мінімальна довжина паролю - 6 символів")
        .required("Потрібно вказати пароль"),
    }),
    onSubmit: async ({ userName, password }) => {
      try {
        const response = await loginUser({ userName, password });

        const { token } = response.data;
        console.log(response);
        console.log(response.data);
        console.log(response.data.token);
        localStorage.setItem("token", token);
        navigate("/languages");
      } catch (e) {
        console.log(e);
      } finally {
        formik.resetForm({ userName: "", password: "" });
      }
    },
  });
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="w-96 p-6 bg-slate-100 rounded-md shadow-2xl">
        <h1 className="text-3xl block text-center font-semubold">Login</h1>
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          <div className="mt-3">
            <label htmlFor="userName" className="block text-base mb-2">
              User login
            </label>
            {/*  */}
            <input
              type="text"
              name="userName"
              placeholder="Enter Login..."
              className="input input-bordered w-full"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {/*  */}
            {formik.errors.userName && formik.touched.userName ? (
              <div>{formik.errors.userName}</div>
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
          <button type="submit" className="btn btn-primary mt-3 w-full">
            Sing in
          </button>
        </form>
        <Link to="/register" className="mt-3 hover:text-cyan-700">
          Do not have account? - Sing up
        </Link>
      </div>
    </div>
  );
}

export default LoginPage;
