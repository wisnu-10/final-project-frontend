import * as yup from "yup";

export const createOrderSchema = yup.object({
  scheduleTime: yup
    .date()
    .typeError("Invalid date format. Please provide a valid date.")
    .required("Pickup schedule is required.")
    .min(new Date(), "Pickup time cannot be in the past. Let’s look forward!"),

  pickupAddressId: yup
    .string()
    .uuid("Pickup address ID must be a valid UUID.")
    .required("Pickup address ID is required."),

  deliveryAddressId: yup
    .string()
    .uuid("Delivery address ID must be a valid UUID.")
    .required("Delivery address ID is required."),
});
