import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  checkUserExistenceByEmail,
  getUsers,
  deleteUsers,
  createUser,
  getUserById,
  updateUserById,
  getUserBySession,
} from "@/controllers/users";
import { catchErrors } from "@/middlewares/error";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.get(
  "/user-by-email-exists/:email",
  catchErrors(checkUserExistenceByEmail)
);

router.use(verifySession());

router.get("/", catchErrors(getUsers));
router.delete("/", catchErrors(deleteUsers));
router.post("/", upload.single("avatar"), catchErrors(createUser));

router.get("/user-by-id/:id", catchErrors(getUserById));
router.put(
  "/user-by-id/:id",
  upload.single("avatar"),
  catchErrors(updateUserById)
);

router.get("/user-by-session", catchErrors(getUserBySession));

export default router;
