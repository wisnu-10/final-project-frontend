import { useState, useEffect } from "react";
import { verifyEmployeeEmail } from "../api/verifyEmail";

export const useVerifyEmployee = (token: string) => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      verifyEmployeeEmail(token)
        .then((res) => {
          setStatus("success");
          setMessage(res.message || "Email verified successfully!");
        })
        .catch((err) => {
          setStatus("error");
          setMessage(err.response?.data?.message || "Failed to verify email.");
        });
    }
  }, [token]);

  return { status, message };
};
