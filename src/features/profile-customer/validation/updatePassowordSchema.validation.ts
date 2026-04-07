import * as Yup from "yup";

export const updatePasswordSchema = Yup.object().shape({
  // Validasi Password (buat body)
  oldPassword: Yup.string()
    .required("Old password is required")
    .min(8, "Old password must be at least 8 characters long")
    .matches(/\d/, "Old password must contain at least one number")
    .matches(/[A-Z]/, "Old password must contain at least one uppercase letter"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "New password must be at least 8 characters long")
    .matches(/\d/, "New password must contain at least one number")
    .matches(/[A-Z]/, "New password must contain at least one uppercase letter"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .min(8, "Confirm password must be at least 8 characters long")
    .matches(/\d/, "Confirm password must contain at least one number")
    .matches(/[A-Z]/, "Confirm password must contain at least one uppercase letter"),
});
