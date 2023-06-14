import { Request, Response, Router } from 'express';

import StatusController from '../controllers/StatusGetController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const controller: StatusController = container.get('Apps.cms.controllers.StatusGetController');
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	router.get('/status', (req: Request, res: Response): Promise<void> => controller.run(req, res));
};
