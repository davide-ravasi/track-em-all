import { useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function useToast() {
  const notifySuccess = useCallback((message: string, options = {}) => {
    toast.success(message, options);
  }, []);

  const notifyInfo = useCallback((message: string, options = {}) => {
    toast.info(message, options);
  }, []);

  const notifyError = useCallback((message: string, options = {}) => {
    toast.error(message, options);
  }, []);

  return { notifySuccess, notifyInfo, notifyError };
}
