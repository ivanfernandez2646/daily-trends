import { Router } from 'express';
import { sync } from 'glob';

export function registerRoutes(router: Router): void {
	const routes = sync(`${__dirname}/**/*.route.*`);
	routes.map(route => register(route, router));
}

function register(routePath: string, router: Router): void {
	// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
	const { register } = require(routePath) as { register: (router: Router) => void };
	register(router);
}
