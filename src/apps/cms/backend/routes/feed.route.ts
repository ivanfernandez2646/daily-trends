import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import FeedCreatorController from '../controllers/feeds/FeedCreatorController';

export const register = (router: Router): void => {
  const feedCreatorController: FeedCreatorController = container.get(
    'Apps.cms.controllers.feeds.FeedCreatorController'
  );
  router.put('/feed/:id', (req: Request, res: Response): Promise<void> => feedCreatorController.run(req, res));
};
