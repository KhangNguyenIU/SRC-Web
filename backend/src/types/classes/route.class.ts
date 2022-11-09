import { Router as ExpressRouter} from 'express'

export abstract class Router {

    router: ExpressRouter;

    constructor(){
        this.router = ExpressRouter();
        this.define();
    }

    define(): void{}
}