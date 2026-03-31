import * as Yup from "yup";

export const updateProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "First name should only contain letters"),

  lastName: Yup.string()
    .nullable()
    .matches(/^[a-zA-Z]+$/, "Last name should only contain letters"),

  phoneNumber: Yup.string()
    .nullable()
    .matches(
      /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/,
      "Invalid Indonesian phone number format",
    ),

  image: Yup.mixed()
    .nullable()
    .test("fileSize", "File is too large, maximum size is 1MB", (value) => {
      if (!value || !(value instanceof File)) return true;
      return value.size <= 1 * 1024 * 1024; // Sesuai limit di Backend (1MB)
    })
    .test("fileFormat", "Format file not accepted", (value) => {
      if (!value || !(value instanceof File)) return true;

      // Ambil ekstensi file-nya
      const extension = value.name.split(".").pop()?.toLowerCase();
      const allowedFormats = ["jpg", "jpeg", "png", "svg", "webp"];

      return extension ? allowedFormats.includes(extension) : false;
    }),
});
