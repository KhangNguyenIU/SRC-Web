import { UserService } from '@services/user.service';
import { Request, Response } from 'express';

import * as fs from 'fs';
import axios from 'axios';
import slugify from 'slugify';
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
      const createdUsers: boolean = await UserService.massCreateUsers();

      if (createdUsers) {
        return res.status(200).json({
          message: 'Created users successfully',
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }

  async fetchProvinces(req: Request, res: Response): Promise<any> {
    try {
      const provincesRes: any = await axios.get(
        'https://provinces.open-api.vn/api/p/'
      );
      const provinces: any = JSON.stringify(
        provincesRes.data.map((province: any) => {
          return { province: province.name, slug: slugify(province.name) };
        })
      );
      // write provinces object to json file name provinces.json
      fs.writeFileSync('provinces.json', provinces);
      // console.log(provinces)
      if (provinces) {
        return res.status(200).json({
          message: 'Fetched provinces successfully',
          // provinces
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  }
}

const testController = TestController.get();
export { testController as TestController };
