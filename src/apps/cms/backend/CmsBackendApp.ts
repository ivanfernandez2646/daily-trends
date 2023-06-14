import { IncomingMessage, Server as NodeServer, ServerResponse } from 'node:http';

import { Server } from './server';

export class CmsBackendApp {
	server?: Server;

	async start(): Promise<void> {
		const port = process.env.PORT ?? '5000';
		this.server = new Server(port);

		return this.server.listen();
	}

	get httpServer(): NodeServer<typeof IncomingMessage, typeof ServerResponse> | undefined {
		return this.server?.getHTTPServer();
	}

	async stop(): Promise<void> {
		return this.server?.stop();
	}
}
