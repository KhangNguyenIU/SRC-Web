import { Logger } from "@config/logger.config";
import { UserService } from "@services/user.service";
import { Response , Request} from "express";


class DashboardController {
    private static instance: DashboardController;

    private constructor() {}

    static get(): DashboardController {
        if (!DashboardController.instance) {
            DashboardController.instance = new DashboardController();
        }
        return DashboardController.instance;
    }

    async userStats(
        req: Request,
        res: Response
      ): Promise<Response<string | any>> {   
        try {
            const { type } = req.params as unknown as { type: string };
            const stats = await UserService.statUsersBy(type)
            return res.status(200).json(stats);
        } catch (error) {
            Logger.log('error', error);
            res.status(400).send('Error occurs when get user stats')
        }
    }
}


const dashboardController = DashboardController.get();

export { dashboardController as DashboardController}