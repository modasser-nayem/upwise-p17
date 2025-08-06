import { Router } from "express";

const router = Router();

const routeItems: { path: string; route: Router }[] = [];

routeItems.forEach((el) => router.use(el.path, el.route));

export const routes = router;
