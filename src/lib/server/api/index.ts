import { Container } from '@needle-di/core';
import { extendZodWithOpenApi } from 'hono-zod-openapi';
import { z } from 'zod';
import { ApplicationModule } from './application.module';
import { ApplicationController } from './application.controller';

extendZodWithOpenApi(z);

const applicationController = new Container().get(ApplicationController);
const applicationModule = new Container().get(ApplicationModule);

/* ------------------------------ startServer ------------------------------ */
export function startServer() {
	return applicationModule.start();
}

/* ----------------------------------- api ---------------------------------- */
export const routes = applicationController.registerControllers();

/* ---------------------------------- Types --------------------------------- */
export type ApiRoutes = typeof routes;
