import { Router } from "express";
import { authRoute } from "../modules/auth/auth.route";
import { courseRoute } from "../modules/course/course.routes";
import { categoryRoute } from "../modules/category/category.routes";
import { enrollmentRoute } from "../modules/enrollment/enrollment.routes";
import { lectureRoute } from "../modules/lecture/lecture.routes";
import { moduleRoute } from "../modules/module/module.routes";
import { progressRoute } from "../modules/progress/progress.routes";
import { reviewRoute } from "../modules/review/review.routes";
import { userRoute } from "../modules/user/user.routes";
import { paymentRoute } from "../modules/payment/payment.routes";
import { metaRoute } from "../modules/meta-data/meta-data.route";
import { notificationRoute } from "../modules/notification/notification.routes";

const router = Router();

const routeItems: { path: string; route: Router }[] = [
   { path: "/auth", route: authRoute },
   { path: "/courses", route: courseRoute },
   { path: "/categories", route: categoryRoute },
   { path: "/enrollments", route: enrollmentRoute },
   { path: "/lectures", route: lectureRoute },
   { path: "/modules", route: moduleRoute },
   { path: "/progress", route: progressRoute },
   { path: "/reviews", route: reviewRoute },
   { path: "/users", route: userRoute },
   { path: "/payments", route: paymentRoute },
   { path: "/meta-data", route: metaRoute },
   { path: "/notifications", route: notificationRoute },
];

routeItems.forEach((el) => router.use(el.path, el.route));

export const routes = router;
