import { Request, Response } from 'express';
import Controller, { CustomException } from '../Controller';
import FeedCreator, { FeedCreatorProps } from '../../../../../contexts/cms/feeds/application/create/FeedCreator';
import { Nullable } from '../../../../../contexts/cms/shared/domain/Nullable';
import httpStatus from 'http-status';
import FeedAlreadyExists from '../../../../../contexts/cms/feeds/domain/FeedAlreadyExists';
import InvalidArgumentError from '../../../../../contexts/cms/shared/domain/InvalidArgumentError';
import FeedSource from '../../../../../contexts/cms/feeds/domain/FeedSource';

export default class FeedCreatorController extends Controller {
  private readonly handler: FeedCreator;

  constructor(handler: FeedCreator) {
    super();

    this.handler = handler;
  }

  protected exceptions(): CustomException[] {
    return [
      { statusCode: httpStatus.FOUND, clazz: FeedAlreadyExists },
      { statusCode: httpStatus.BAD_REQUEST, clazz: InvalidArgumentError }
    ];
  }

  async _run(req: Request, res: Response): Promise<void> {
    const { id } = req.params,
      { title, description, author } = req.body,
      feedCreatorProps: FeedCreatorProps = {
        id: id as string,
        title: title as string,
        description: (description ?? null) as Nullable<string>,
        author: author as string,
        source: FeedSource.CMS
      };

    const feedCreated = await this.handler.execute(feedCreatorProps);

    res.status(httpStatus.CREATED).json(feedCreated.toPrimitives());
  }
}
