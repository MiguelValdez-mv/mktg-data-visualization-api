import express from "express";

import {
  checkUserExistenceByEmail,
  getUserDetailsFromSupertokensId,
} from "@/controllers/users";
import { verifySession } from "@/middlewares/verifySession";

const router = express.Router();

router.get("/user-by-email-exists", checkUserExistenceByEmail);
router.get(
  "/get-user-details-from-supertokens-id",
  verifySession(),
  getUserDetailsFromSupertokensId
);

export default router;
