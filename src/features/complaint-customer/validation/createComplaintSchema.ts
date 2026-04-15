import * as Yup from "yup";

export const createComplaintSchema = Yup.object().shape({
  orderId: Yup.string()
    .required("Order ID is required")
    .uuid("Invalid Order ID format"),

  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters long")
    .trim(),
});
