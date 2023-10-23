import { Request, Response } from 'express';
import httpStatus from 'http-status';
import Controller, { CustomException } from '../Controller';
import InvalidArgumentError from '../../../../../contexts/cms/shared/domain/InvalidArgumentError';
import FeedSearcher from '../../../../../contexts/cms/feeds/application/search/FeedSearcher';
import FeedSource from '../../../../../contexts/cms/feeds/domain/FeedSource';
import FeedScraper from '../../../../../contexts/cms/feeds/application/scrap/FeedScraper';
import moment from 'moment';

export default class FeedHomeController extends Controller {
  private readonly handler: FeedSearcher;
  private readonly scraperHandler: FeedScraper;

  constructor(handler: FeedSearcher, scraperHandler: FeedScraper) {
    super();

    this.handler = handler;
    this.scraperHandler = scraperHandler;
  }

  protected exceptions(): CustomException[] {
    return [{ statusCode: httpStatus.BAD_REQUEST, clazz: InvalidArgumentError }];
  }

  async _run(req: Request, res: Response): Promise<void> {
    let feeds = await this.handler.execute({
      filter: [{ source: FeedSource.EL_MUNDO }, { source: FeedSource.EL_PAIS }],
      sort: { createdAt: 'desc' },
      limit: 10
    });

    // check if is needed to fire the scraper again. // SCHEDULER IN A FUTURE
    if (feeds?.length > 0) {
      const newestFeedDate = moment(feeds[0].createdAt.value);

      if (newestFeedDate.isBefore(moment(), 'date')) {
        await this.scraperHandler.execute();
        feeds = await this.handler.execute({
          filter: [{ source: FeedSource.EL_MUNDO }, { source: FeedSource.EL_PAIS }],
          sort: { createdAt: 'desc' },
          limit: 10
        });
      }
    }

    res.status(httpStatus.OK).json(feeds.map(feed => feed.toPrimitives()));
  }
}
