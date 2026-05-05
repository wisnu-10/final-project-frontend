import * as Yup from "yup";

export const processOrderSchema = Yup.object().shape({
  totalWeight: Yup.number()
    .required("Total weight is required")
    .positive("Weight must be greater than 0")
    .typeError("Weight must be a number"),
  workerId: Yup.string()
    .required("Please assign a worker for this process")
    .uuid("Invalid worker format"),
  orderItems: Yup.array().of(
    Yup.object().shape({
      laundryItemId: Yup.string().optional(),
      quantity: Yup.number()
        .min(1, "Min 1")
        .typeError("Must be a number"),
    }),
  ),
});

