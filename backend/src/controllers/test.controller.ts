import { UserService } from '@services/user.service';
import { Request, Response } from 'express';
class TestController {
  private static instance: TestController;

  private constructor() {}

  static get(): TestController {
    if (!TestController.instance) {
      TestController.instance = new TestController();
    }
    return TestController.instance;
  }


  async massCreateUsers(req: Request, res: Response): Promise<any> {
    try {
      
        const createdUsers: boolean = await UserService.massCreateUsers()

        if(createdUsers){
            return res.status(200).json({
                message: "Created users successfully"
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
  }
}

const testController = TestController.get();
export { testController as TestController };
