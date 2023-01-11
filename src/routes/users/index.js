import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  checkUserExistenceByEmail,
  getUserDetailsFromSupertokensId,
} from "@/controllers/users";

const router = express.Router();

router.get("/user-by-email-exists", checkUserExistenceByEmail);
router.get(
  "/get-user-details-from-supertokens-id",
  verifySession(),
  getUserDetailsFromSupertokensId
);

export default router;
