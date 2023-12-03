import * as Yup from 'yup';
import baseSchema from './baseSchema.js';

export default baseSchema.shape({
  userEmail: Yup.string().email().required(),
});
