import * as Yup from "yup";

export const authRegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .matches(/^[a-zA-Z\s]+$/, "First name should only contain letters")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "The first letter of each word must be capitalized",
    ),

  lastName: Yup.string()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s]+$/, "Last name should only contain letters")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "The first letter of each word must be capitalized",
    ),

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
