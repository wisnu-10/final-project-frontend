import * as Yup from "yup";

export const processOrderSchema = Yup.object().shape({
  totalWeight: Yup.number()
    .required("Total weight is required")
    .min(0, "Weight cannot be negative")
    .typeError("Weight must be a number"),
  workerId: Yup.string()
    .required("Please assign a worker for this process")
    .uuid("Invalid worker format"),
  orderItems: Yup.array().of(
    Yup.object().shape({
      laundryItemId: Yup.string().optional(),
      quantity: Yup.number().min(1, "Min 1").typeError("Must be a number"),
    }),
  ),
}).test(
  "at-least-one",
  "You must provide either total weight or at least one laundry item",
  (values: any) => {
    const hasWeight = (Number(values.totalWeight) || 0) > 0;
    const hasItems =
      values.orderItems &&
      values.orderItems.some(
        (item: any) => item.laundryItemId && item.quantity > 0,
      );
    return hasWeight || hasItems;
  },
);

