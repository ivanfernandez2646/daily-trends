import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller, { CustomException } from '../Controller';
import InvalidArgumentError from '../../../../../contexts/cms/shared/domain/InvalidArgumentError';
import FeedSearcher from '../../../../../contexts/cms/feeds/application/search/FeedSearcher';
import FeedSource from '../../../../../contexts/cms/feeds/domain/FeedSource';

export default class FeedHomeController extends Controller {
  private readonly handler: FeedSearcher;

  constructor(handler: FeedSearcher) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [{ statusCode: httpStatus.BAD_REQUEST, clazz: InvalidArgumentError }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const feeds = await this.handler.execute({
      filter: [{ source: FeedSource.EL_MUNDO }, { source: FeedSource.EL_PAIS }],
      sort: { createdAt: 'desc' },
      limit: 10
    });

    res.status(httpStatus.OK).json(feeds.map(feed => feed.toPrimitives()));
  }
}
