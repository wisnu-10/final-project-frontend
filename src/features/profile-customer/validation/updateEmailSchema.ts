import * as Yup from "yup";

export const updateEmailSchema = Yup.object().shape({
  email: Yup.string()
      .required("Email is required")
      .email("Invalid email format")
      .trim() // Mirip normalizeEmail buat bersihin spasi
      .lowercase(), // Biar konsisten huruf kecil semua
});
