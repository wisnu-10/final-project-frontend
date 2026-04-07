import * as Yup from "yup";

export const authLoginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .trim() // Mirip normalizeEmail buat bersihin spasi
    .lowercase(), // Biar konsisten huruf kecil semua

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter"),
});
