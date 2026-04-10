import * as Yup from "yup";

export const LaundryItemSchema = Yup.object().shape({
  name: Yup.string().required("Item name is required"),
  pricingType: Yup.string()
    .oneOf(["kiloan", "per_item"], "Pricing type must be kiloan or per_item")
    .required("Pricing type is required"),
  price: Yup.number()
    .min(0, "Price must be at least 0")
    .required("Price is required"),
});
