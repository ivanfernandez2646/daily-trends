import { Request, Response } from 'express';
import httpStatus from 'http-status';
import FeedScraper from '../../../../../contexts/cms/feeds/application/scrap/FeedScraper';
import Controller, { CustomException } from '../Controller';

export default class FeedScraperController extends Controller {
  private readonly handler: FeedScraper;

  constructor(handler: FeedScraper) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [];
  }

  async _run(req: Request, res: Response): Promise<void> {
    await this.handler.execute();

    res.status(httpStatus.OK).send();
  }
}
