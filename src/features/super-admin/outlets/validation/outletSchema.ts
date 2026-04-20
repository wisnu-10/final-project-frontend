import * as Yup from "yup";

export const OutletSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  provinceId: Yup.number().required("Required"),
  provinceName: Yup.string().required("Required"),
  cityId: Yup.number().required("Required"),
  cityName: Yup.string().required("Required"),
  districtId: Yup.number().required("Required"),
  districtName: Yup.string().required("Required"),
  postalCode: Yup.string().required("Required"),
   maxServiceDistance: Yup.number().min(0).required("Required"),
  isActive: Yup.boolean().required("Required"),
  pricePerKg: Yup.number().min(0).required("Required"),
});
