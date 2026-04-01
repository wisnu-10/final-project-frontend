import * as Yup from "yup";

export const updatePasswordSchema = Yup.object().shape({
  // Validasi Password (buat body)
  newPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),

  confirmPassword: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
});
