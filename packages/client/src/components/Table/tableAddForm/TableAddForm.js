import { useFormik } from "formik";
import * as Yup from "yup";

import { postLanguages } from "../../../services/api";
import { useDispatch } from "react-redux";
import { languagesPost } from "../tableList/languagesSlice";

function TableAddForm() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      yearOfCreated: 0,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Назва повинна складатись мінімум з 2х символів!")
        .required("Обов'язкове поле!"),
      yearOfCreated: Yup.number()
        .min(1900, "Потрібно вказати точний рік")
        .max(2023, "Потрібно вказати точну дату")
        .required("Обов'язкове поле!"),
    }),
    onSubmit: ({ name, yearOfCreated }) => {
      try {
        postLanguages({ name, yearOfCreated }).then((res) =>
          dispatch(languagesPost(res.data))
        );
      } catch (e) {
        console.log(e);
      } finally {
        formik.resetForm({ name: "", yearOfCreated: 0 });
      }
    },
  });

  return (
    <div className="mx-auto mt-5 w-full text-base bg-sky-800 text-white rounded py-8 px-6 mb-5">
      <h3 className="text-2xl">Додати/обновити мову програмування</h3>
      <form
        className="flex justify-between pt-4"
        onSubmit={formik.handleSubmit}
      >
        <input
          className="border text-black block focus:outline-none px-3 py-1 w-1/3 rounded"
          style={{ transition: "all .9s ease-out" }}
          name="name"
          type="text"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Назва мови"
        />
        {formik.errors.name && formik.touched.name ? (
          <div>{formik.errors.name}</div>
        ) : null}
        <input
          className=" border text-black block focus:outline-none px-3 py-1 w-1/3 rounded"
          style={{ transition: "all 2s ease" }}
          name="yearOfCreated"
          type="number"
          value={formik.values.yearOfCreated}
          onChange={formik.handleChange}
          placeholder="Рік розробки"
        />
        {formik.errors.yearOfCreated && formik.touched.yearOfCreated ? (
          <div>{formik.errors.yearOfCreated}</div>
        ) : null}
        <button
          type="submit"
          className=" hover:bg-gray-100 hover:text-black text-white font-semibold py-2 px-4 border bg-sky-800 rounded shadow transition duration-400 ease-in-out"
        >
          Відправити
        </button>
      </form>
    </div>
  );
}

export default TableAddForm;
