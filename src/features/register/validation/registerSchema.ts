import * as Yup from "yup";

export const authRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z]+$/, "First name should only contain letters"),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z]+$/, "Last name should only contain letters"),

  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),

  phoneNumber: Yup.string()
    .required("Phone number is required")

    .matches(
      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
      "Invalid Indonesian phone number format",
    ),
});
