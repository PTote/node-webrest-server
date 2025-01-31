import express, { Router } from 'express';
import path from 'node:path';

interface Options {
    port: number;
    routes: Router;
    public_path?: string;
}

export class Server {

    public readonly app = express();
    private serverListener?: any;
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){

        const { port, public_path = 'public', routes} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes;
    }

    async start(){

        //Middlewares
        this.app.use(express.json());


        this.app.use(express.static(this.publicPath));

        //ROUTES
        this.app.use(this.routes);

        //SPA
        this.app.get('*', (req, res) => {

            const indexPath = path.join( __dirname + `../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
        });

        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });



        console.log('server running');
    }

    public close(){
        this.serverListener?.close();
    }

}