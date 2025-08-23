import { createTRPCRouter } from '../init';

import { projectsRouter } from '@/modules/projects/server/procedures';
import { technologiesRouter } from '@/modules/technologies/procedures';

export const appRouter = createTRPCRouter({
  projects: projectsRouter,
  technologies: technologiesRouter
});

export type AppRouter = typeof appRouter;
