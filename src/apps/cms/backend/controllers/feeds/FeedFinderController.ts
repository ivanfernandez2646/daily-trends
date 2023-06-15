import { Request, Response } from 'express';
import httpStatus from 'http-status';
import FeedFinder from '../../../../../contexts/cms/feeds/application/find/FeedFinder';
import Controller, { CustomException } from '../Controller';
import FeedNotFound from '../../../../../contexts/cms/feeds/domain/FeedNotFound';
import FeedId from '../../../../../contexts/cms/feeds/domain/FeedId';

export default class FeedFinderController extends Controller {
  private readonly handler: FeedFinder;

  constructor(handler: FeedFinder) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ statusCode: httpStatus.NOT_FOUND, clazz: FeedNotFound }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      feed = await this.handler.execute(new FeedId(id));

    res.status(httpStatus.OK).json(feed.toPrimitives());
  }
}
