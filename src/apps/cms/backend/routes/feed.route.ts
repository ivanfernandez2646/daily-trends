import { Request, Response, Router } from 'express';

import container from '../dependency-injection';
import FeedCreatorController from '../controllers/feeds/FeedCreatorController';
import FeedFinderController from '../controllers/feeds/FeedFinderController';
import FeedDeleterController from '../controllers/feeds/FeedDeleterController';
import FeedUpdaterController from '../controllers/feeds/FeedUpdaterController';
import FeedScraperController from '../controllers/feeds/FeedScraperController';

export const register = (router: Router): void => {
  const feedScraperController: FeedScraperController = container.get(
    'Apps.cms.controllers.feeds.FeedScraperController'
  );
  router.get('/feed/scrap', (req: Request, res: Response): Promise<void> => feedScraperController.run(req, res));

  const feedCreatorController: FeedCreatorController = container.get(
    'Apps.cms.controllers.feeds.FeedCreatorController'
  );
  router.put('/feed/:id', (req: Request, res: Response): Promise<void> => feedCreatorController.run(req, res));

  const feedFinderController: FeedFinderController = container.get('Apps.cms.controllers.feeds.FeedFinderController');
  router.get('/feed/:id', (req: Request, res: Response): Promise<void> => feedFinderController.run(req, res));

  const feedDeleterController: FeedDeleterController = container.get(
    'Apps.cms.controllers.feeds.FeedDeleterController'
  );
  router.delete('/feed/:id', (req: Request, res: Response): Promise<void> => feedDeleterController.run(req, res));

  const feedUpdaterController: FeedUpdaterController = container.get(
    'Apps.cms.controllers.feeds.FeedUpdaterController'
  );
  router.patch('/feed/:id', (req: Request, res: Response): Promise<void> => feedUpdaterController.run(req, res));
};
