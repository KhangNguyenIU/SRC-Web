import { Router } from "@classes";
import { TestController } from "@controllers/test.controller";
import { UploadController } from "@controllers/upload.controller";


export class TestRoute extends Router{
    constructor(){
        super();
    }
    
    define(): void{
        this.router.post('/', UploadController.upload);
        
        this.router.post('/mass-create-users', TestController.massCreateUsers)

        this.router.get('/fetch-provinces', TestController.fetchProvinces)
    }
}