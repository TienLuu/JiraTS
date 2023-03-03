import { toast } from "react-toastify";

const showSuccess = (message?: string, callBack = () => {}) => {
   toast.success(message, {
      autoClose: 1000,
      onClose: callBack,
   });
};

const showError = (message?: string, callBack = () => {}) => {
   toast.error(message, {
      autoClose: 1000,
      onClose: callBack,
   });
};

export { showSuccess, showError };
