import * as Yup from "yup";

export default Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  year: Yup.number().positive().integer().required(),
}).notOneOf([undefined]);
