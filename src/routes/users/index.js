import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  checkUserExistenceByEmail,
  getUserDetailsFromSupertokensId,
  createUser,
} from "@/controllers/users";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.get("/user-by-email-exists", checkUserExistenceByEmail);

router.use(verifySession());
router.get(
  "/get-user-details-from-supertokens-id",
  getUserDetailsFromSupertokensId
);
router.post("/", upload.single("avatar"), createUser);

export default router;
