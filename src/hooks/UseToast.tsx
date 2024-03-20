import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function useToast() {
  const notifySuccess = (message: string, options = {}) => {
    toast.success(message, options);
  };

  const notifyInfo = (message: string, options = {}) => {
    toast.info(message, options);
  };

  const notifyError = (message: string, options = {}) => {
    toast.error(message, options);
  };

  return { notifySuccess, notifyInfo, notifyError };
}
