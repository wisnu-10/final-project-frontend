import Swal from "sweetalert2";

interface ConfirmDeleteProps {
  title?: string;
  text?: string;
  confirmButtonText?: string;
  onConfirm: () => Promise<void>; // The actual delete API call
  onSuccess?: () => void; // Refresh data callback
}

export const showConfirmDelete = ({
  title = "Are you sure?",
  text = "This action cannot be undone!",
  confirmButtonText = "Yes, delete it!",
  onConfirm,
  onSuccess,
}: ConfirmDeleteProps) => {
  Swal.fire({
    title: `<span style="color: #2C2826; font-family: sans-serif;">${title}</span>`,
    text: text,
    icon: "warning",
    iconColor: "#FF6B4A", // Your signature orange
    showCancelButton: true,
    confirmButtonColor: "#FF6B4A", // Match your theme
    cancelButtonColor: "#6B6662", // Neutral grayish
    confirmButtonText: confirmButtonText,
    cancelButtonText: "Cancel",
    reverseButtons: true, // Puts Cancel on the left, Confirm on the right
    showLoaderOnConfirm: true,
    customClass: {
      popup: "rounded-3xl", // Matches your rounded-2xl/3xl UI
      confirmButton: "rounded-xl px-6 py-2 font-semibold",
      cancelButton: "rounded-xl px-6 py-2 font-semibold",
    },
    preConfirm: async () => {
      try {
        await onConfirm();
        return true;
      } catch (error: any) {
        Swal.showValidationMessage(
          `Request failed: ${error.response?.data?.message || "Internal Server Error"}`,
        );
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your record has been successfully removed.",
        icon: "success",
        confirmButtonColor: "#4A90E2", // Use your Blue for success state
        customClass: {
          popup: "rounded-3xl",
        },
      });
      if (onSuccess) onSuccess();
    }
  });
};
