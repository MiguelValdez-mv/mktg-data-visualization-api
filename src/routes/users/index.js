import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  checkUserExistenceByEmail,
  getUsers,
  createUser,
  getUserFromSession,
} from "@/controllers/users";
import { catchErrors } from "@/middlewares/error";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.get("/user-by-email-exists", catchErrors(checkUserExistenceByEmail));

router.use(verifySession());
router.get("/", catchErrors(getUsers));
router.post("/", upload.single("avatar"), catchErrors(createUser));
router.get("/get-user-from-session", catchErrors(getUserFromSession));

export default router;
