import { Request, Response } from 'express';
import httpStatus from 'http-status';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CustomException = { clazz: Function; statusCode: number };

export default abstract class Controller {
  async run(req: Request, res: Response) {
    try {
      await this._run(req, res);
    } catch (err) {
      if (err instanceof Error) {
        this.handleError(err, res);
      } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
      }
    }
  }

  private handleError(err: Error, res: Response) {
    let isExceptionHandled = false;

    for (const exception of this.exceptions()) {
      if (err instanceof exception.clazz) {
        res.status(exception.statusCode).send({ error: err.message });
        isExceptionHandled = true;
        break;
      }
    }

    if (!isExceptionHandled) {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: err.message });
    }
  }

  protected exceptions(): CustomException[] {
    return [];
  }

  protected abstract _run(req: Request, res: Response): Promise<void>;
}
