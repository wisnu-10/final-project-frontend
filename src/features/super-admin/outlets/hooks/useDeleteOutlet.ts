import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteOutletApi } from "../api/deleteOutlet.api";

export default function useDeleteOutlet(onSuccess: () => void) {
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
        await deleteOutletApi(id);
        toast.success("Outlet deleted successfully");
        onSuccess();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to delete outlet");
      }
    }
  };

  return { handleDelete };
}
