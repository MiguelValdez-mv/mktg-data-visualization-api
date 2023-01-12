import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  checkUserExistenceByEmail,
  getUserFromSession,
  createUser,
} from "@/controllers/users";
import { catchErrors } from "@/middlewares/error";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.get("/user-by-email-exists", catchErrors(checkUserExistenceByEmail));

router.use(verifySession());
router.get("/get-user-from-session", catchErrors(getUserFromSession));
router.post("/", upload.single("avatar"), catchErrors(createUser));

export default router;
