import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteEmployeeApi } from "../api/deleteEmployee.api";

export default function useDeleteEmployee(onSuccess: () => void) {
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteEmployeeApi(id);
        toast.success("Employee deleted successfully");
        onSuccess();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to delete employee");
      }
    }
  };

  return { handleDelete };
}
