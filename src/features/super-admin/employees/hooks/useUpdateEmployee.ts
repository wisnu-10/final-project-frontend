import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { updateEmployeeApi } from "../api/updateEmployee.api";
import { getEmployeeByIdApi } from "../api/getEmployeeById.api";
import { EmployeeSchema } from "../validation/employeeSchema";

export default function useUpdateEmployee(id: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      identityNumber: "",
      bankAccountNumber: "",
      role: "worker",
      password: "",
      outletId: "",
    },
    validationSchema: EmployeeSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const payload: any = { ...values };
        if (!payload.password) delete payload.password;
        if (!payload.outletId) delete payload.outletId;

        await updateEmployeeApi(id, payload);
        toast.success("Employee updated successfully");
        router.push("/super-admin/employees");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to update employee");
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    if (id) {
      getEmployeeByIdApi(id)
        .then((res) => {
          if (res.success && res.data) {
            formik.setValues({
              firstName: res.data.firstName || "",
              lastName: res.data.lastName || "",
              email: res.data.email || "",
              phoneNumber: res.data.phoneNumber || "",
              identityNumber: res.data.identityNumber || "",
              bankAccountNumber: res.data.bankAccountNumber || "",
              role: res.data.role || "worker",
              password: "",
              outletId: res.data.outletId || "",
            });
          }
          setFetching(false);
        })
        .catch(() => {
          toast.error("Failed to load employee details");
          setFetching(false);
        });
    }
  }, [id]);

  return { formik, isLoading, fetching };
}
