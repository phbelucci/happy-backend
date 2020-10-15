import multer from 'multer';
import path from 'path';

export default {
    storage: multer.diskStorage({
        //onde as imagens serao salvas
        destination: path.join(__dirname, '..', '..', 'uploads'),
        //
        filename: (request, file, callBack) => {
            const fileName = `${Date.now()}-${file.originalname}`;
            //primeiro parametro é um erro
            callBack(null, fileName);
        }
    })
}