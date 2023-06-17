import { json, urlencoded } from 'body-parser';
import compress from 'compression';
import errorHandler from 'errorhandler';
import express, { Request, Response } from 'express';
import Router from 'express-promise-router';
import cors from 'cors';
import * as http from 'http';
import httpStatus from 'http-status';

import { registerRoutes } from './routes';
import { registerSwagger } from './openapi';

export class Server {
  private readonly express: express.Express;
  private readonly port: string;
  private httpServer?: http.Server;

  constructor(port: string) {
    this.port = port;
    this.express = express();
    this.express.use(json());
    this.express.use(urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(compress());
    const router = Router();
    router.use(errorHandler());
    this.express.use(router);

    registerRoutes(router);

    registerSwagger(router);

    router.use((err: Error, req: Request, res: Response, _next: () => void) => {
      console.log(err);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
    });
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      const env = this.express.get('env') as string;

      this.httpServer = this.express.listen(this.port, () => {
        if (env !== 'test') {
          console.log(
            'App is running at %s:%d in %s mode',
            env === 'production' ? process.env.RENDER_EXTERNAL_URL : 'http://localhost',
            this.port.toString(),
            process.env.NODE_ENV
          );
        }

        resolve();
      });
    });
  }

  getHTTPServer(): Server['httpServer'] {
    return this.httpServer;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        });
      }

      resolve();
    });
  }
}
