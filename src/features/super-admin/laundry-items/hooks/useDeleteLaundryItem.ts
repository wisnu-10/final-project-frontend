import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { deleteLaundryItemApi } from "../api/deleteLaundryItem.api";

export default function useDeleteLaundryItem(onSuccess: () => void) {
  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This laundry item will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff7143",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        await deleteLaundryItemApi(id);
        toast.success("Laundry item deleted successfully");
        onSuccess();
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Failed to delete laundry item");
      }
    }
  };

  return { handleDelete };
}
