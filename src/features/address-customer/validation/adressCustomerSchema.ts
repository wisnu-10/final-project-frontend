import * as Yup from "yup";

export const addressValidationSchema = Yup.object().shape({
  // Recipient Details
  recipientName: Yup.string()
    .required("Recipient name is required")
    .min(3, "Recipient name must be at least 3 characters long")
    .trim()
    .matches(/^[a-zA-Z\s]+$/, "Recipient name should only contain letters")
    .matches(
      /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,
      "The first letter of each word must be capitalized",
    ),

  recipientPhoneNumber: Yup.string()
    .required("Recipient phone number is required")
    // Karena Yup gak punya .isMobilePhone('id-ID'), kita pake regex standar nomor HP Indonesia
    .matches(
      /^(^\+62|62|08)[0-9]{7,13}$/,
      "Invalid Indonesian phone number format",
    ),

  // Address Labels & Details
  label: Yup.string().required(
    "Address label is required (e.g., Home, Office)",
  ),

  address: Yup.string()
    .required("Full address is required")
    .min(10, "Address should be more detailed (min 10 chars)"),

  // Location IDs
  districtId: Yup.number()
    .required("District is required")
    .positive("Location ID must be a valid positive integer")
    .integer(),

  cityId: Yup.number()
    .required("City is required")
    .positive("Location ID must be a valid positive integer")
    .integer(),

  provinceId: Yup.number()
    .required("Province is required")
    .positive("Location ID must be a valid positive integer")
    .integer(),

  // Location Names
  districtName: Yup.string().required("Location name is required"),

  cityName: Yup.string().required("Location name is required"),

  provinceName: Yup.string().required("Location name is required"),

  // Postal Code
  postalCode: Yup.string()
    .required("Postal code is required")
    .length(5, "Postal code must be exactly 5 digits")
    .matches(/^[0-9]+$/, "Postal code must contain only numbers"),

  // Coordinates
  latitude: Yup.number()
    .required("Latitude is required")
    .min(-90, "Invalid latitude range")
    .max(90, "Invalid latitude range"),

  longitude: Yup.number()
    .required("Longitude is required")
    .min(-180, "Invalid longitude range")
    .max(180, "Invalid longitude range"),

  // Others
  isPrimary: Yup.boolean().required("isPrimary must be a boolean value"),

  notes: Yup.string().nullable().notRequired(),
});
