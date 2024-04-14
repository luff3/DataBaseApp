import { toast } from 'react-toastify';

const checkErrorAndNotify = (error) => {
    if (error.response && error.response.data && error.response.data.message === "Ти лох в тебе прав нема") {
        toast.error("Ти лох в тебе прав нема");
        return true;
    }
    return false; 
};

export default checkErrorAndNotify;
