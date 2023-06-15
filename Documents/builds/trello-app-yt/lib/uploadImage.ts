import {storage, ID} from "@/appWrite"
const uploadImage = async (file: File) => {
    if(!file) return;
    const fileUpload = await storage.createFile("647b22658e3659b24cb6", ID.unique(), file);
    return fileUpload;


}


export default uploadImage;