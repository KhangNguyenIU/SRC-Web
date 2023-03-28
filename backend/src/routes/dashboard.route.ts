import { Router } from "@classes";
import { DashboardController } from "@controllers/dashboard.controller";

export class DashboardRoute extends Router{
    constructor(){
        super();
    }

    define(): void {
        this.router.route('/user-stat').get(DashboardController.userStats);
    }
}

