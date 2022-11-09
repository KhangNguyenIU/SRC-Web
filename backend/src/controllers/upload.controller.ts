
import { CloudinaryService } from '@services/cloudinary.service';
import { Request, Response } from 'express';
import * as Formidable from 'formidable'
class UploadController {
    private static instance : UploadController;

    private constructor() {}

    static get() : UploadController {
        if (!UploadController.instance) {
            UploadController.instance = new UploadController();
        }
        return UploadController.instance;
    }

    async upload(req : Request, res : Response) : Promise<Response<string | any>> {
        try{
            const form = Formidable({ multiples: true });

            form.parse(req, async(err, fields, files) => {
                if(err){
                    return res.status(400).json({message: err.message});
                }
                console.log({files});
                console.log({fields}, files.image.filepath);
                try {
                    const url = await CloudinaryService.upload(files.image.filepath);
                    return res.status(200).json({message: "Image uploaded successfully", url});
                } catch (error) {
                    return res.status(400).json({message: error.message});
                }
            })
        }catch(error){
            console.log(error)
            return res.status(400).send(error);
        }
    }
}

const uploadController = UploadController.get();

export { uploadController as UploadController };