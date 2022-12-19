import { Router } from "@classes";
import { UploadController } from "@controllers/upload.controller";

export class UploadRoute extends Router{
    constructor(){
        super();
    }
    
    define(): void{
        this.router.post('/', UploadController.upload);
    }
}