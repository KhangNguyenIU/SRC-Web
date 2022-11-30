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

  async testGet(req: Request, res: Response): Promise<Response<string | any>> {
    try {
      return res.status(200).json({ message: 'Test Get' });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }

  async testPost(req: Request, res: Response): Promise<Response<string | any>> {
    try {
      const { name } = req.body;
      console.log(req.body.name)
      console.log({name})
      return res.status(200).json({ message: 'Test Post', name });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
}

const testController = TestController.get();
export { testController as TestController };
