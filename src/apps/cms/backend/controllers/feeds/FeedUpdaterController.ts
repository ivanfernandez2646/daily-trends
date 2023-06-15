import { Request, Response } from 'express';
import Controller, { CustomException } from '../Controller';
import { Nullable } from '../../../../../contexts/cms/shared/domain/Nullable';
import httpStatus from 'http-status';
import InvalidArgumentError from '../../../../../contexts/cms/shared/domain/InvalidArgumentError';
import FeedNotFound from '../../../../../contexts/cms/feeds/domain/FeedNotFound';
import FeedUpdater, { FeedUpdaterProps } from '../../../../../contexts/cms/feeds/application/update/FeedUpdater';

export default class FeedUpdaterController extends Controller {
  private readonly handler: FeedUpdater;

  constructor(handler: FeedUpdater) {
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
    const { id } = req.params,
      { title, description } = req.body,
      feedUpdaterProps: FeedUpdaterProps = {
        id: id as string,
        title: (title as string) || undefined,
        description: description === undefined ? undefined : (description as Nullable<string>)
      };

    const feedUpdated = await this.handler.execute(feedUpdaterProps);

    res.status(httpStatus.OK).json(feedUpdated.toPrimitives());
  }
}
