import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { registerEmployeeApi } from "../api/registerEmployee.api";
import { EmployeeSchema } from "../validation/employeeSchema";

export default function useRegisterEmployee() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      identityNumber: "",
      bankAccountNumber: "",
      password: "",
      role: "worker",
      outletId: "",
    },
    validationSchema: EmployeeSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload: any = { ...values };
        if (!payload.outletId) delete payload.outletId;

        await registerEmployeeApi(payload);
        toast.success("Employee created successfully");
        router.push("/super-admin/employees");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to create employee");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return { formik, isLoading };
}
