import { Router } from "@classes";
import { ConversationController } from "@controllers/conversation.controller";
import { ROLE } from "@enums";
import { AuthMiddleware } from "@middlewares/auth.middleware";

export class ConversationRoute extends Router{
    constructor(){
        super()
    }

    define(): void {
        this.router.post('/create', AuthMiddleware.checkRole([ROLE.admin,ROLE.staff, ROLE.user]),ConversationController.createConversation);

        this.router.get('/',  AuthMiddleware.checkRole([ROLE.admin,ROLE.staff, ROLE.user]),ConversationController.getConversation)

        this.router.get('/my-conversation',  AuthMiddleware.checkRole([ROLE.admin,ROLE.staff, ROLE.user]),ConversationController.getConversationByUserId)
    }
}