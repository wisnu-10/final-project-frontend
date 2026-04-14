import * as Yup from "yup";

export const EmployeeSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phoneNumber: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  identityNumber: Yup.string().required("Required"),
  bankAccountNumber: Yup.string().required("Required"),
});
