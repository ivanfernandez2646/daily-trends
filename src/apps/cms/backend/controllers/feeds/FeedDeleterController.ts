import { Request, Response } from 'express';
import httpStatus from 'http-status';
import FeedDeleter from '../../../../../contexts/cms/feeds/application/delete/FeedDeleter';
import FeedId from '../../../../../contexts/cms/feeds/domain/FeedId';
import FeedNotFound from '../../../../../contexts/cms/feeds/domain/FeedNotFound';
import Controller, { CustomException } from '../Controller';
import InvalidArgumentError from '../../../../../contexts/cms/shared/domain/InvalidArgumentError';

export default class FeedDeleterController extends Controller {
  private readonly handler: FeedDeleter;

  constructor(handler: FeedDeleter) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [
      { statusCode: httpStatus.NOT_FOUND, clazz: FeedNotFound },
      { statusCode: httpStatus.BAD_REQUEST, clazz: InvalidArgumentError }
    ];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.handler.execute(new FeedId(id));

    res.status(httpStatus.OK).send();
  }
}
