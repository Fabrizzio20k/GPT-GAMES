import { toast } from "sonner";

export const toastError = (errors: any) => {
    let errorString = '';
    for (const key in errors) {
        errorString += `${key}: ${errors[key]}\n`;
    }
    errorString = errorString.toUpperCase();
    toast.error(errorString);
}
