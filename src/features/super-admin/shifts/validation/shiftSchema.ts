import * as Yup from "yup";

export const shiftSchema = Yup.object({
  shiftName: Yup.string()
    .required("Shift name is required")
    .min(3, "Shift name must be at least 3 characters"),
  startTime: Yup.string()
    .required("Start time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format must be HH:mm (e.g. 08:00)"),
  endTime: Yup.string()
    .required("End time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format must be HH:mm (e.g. 17:00)"),
});
