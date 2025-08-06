"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
const routeItems = [];
routeItems.forEach((el) => router.use(el.path, el.route));
exports.routes = router;
