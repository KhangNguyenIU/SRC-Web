import { Router } from "@classes";
import { TestController } from "@controllers/test.controller";
import { UploadController } from "@controllers/upload.controller";


export class TestRoute extends Router{
    constructor(){
        super();
    }
    
    define(): void{
        this.router.post('/', UploadController.upload);
        
        this.router.get('/get', TestController.testGet)

        this.router.post('/post', TestController.testPost)
    }
}