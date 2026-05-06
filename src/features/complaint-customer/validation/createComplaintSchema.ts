import * as Yup from "yup";

export const createComplaintSchema = Yup.object().shape({
  invoiceNumber: Yup.string().required("Invoice Number is required"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .trim(),
});
