import { Router } from "express";
import { userController } from "./user.controller";
import { authGuard } from "../../middleware/authGuard";
import { ROLE } from "../../constant";

const router = Router();

router.patch("/:id", userController.updateDoc);

router.get(
   "/my-profile",
   authGuard(ROLE.admin, ROLE.student, ROLE.instructor),
   userController.getMyProfile
);

//get user
router.get("/:id", userController.getUserById);
router.get("/", userController.getAllFromDB);

export const userRoute = router;
