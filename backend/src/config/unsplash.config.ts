import { createApi} from 'unsplash-js'
import { Environment } from './environment.config';
class Unsplash {
    private static instance: Unsplash;

    unsplash: any;

    constructor(){}

    static getInstance() {
        if (!Unsplash.instance) {
            Unsplash.instance = new Unsplash();
        }
        return Unsplash.instance;
    }

    plug(): any{
        this.unsplash = createApi({
            accessKey: Environment.UNSPLASH_ACCESS_KEY,
        })
        return  this.unsplash
    }
}

const unsplash = Unsplash.getInstance().plug();
export { unsplash as Unsplash };