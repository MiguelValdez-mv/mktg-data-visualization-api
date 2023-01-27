import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { createBusiness } from "@/controllers/businesses";
import { catchErrors } from "@/middlewares/error";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.use(verifySession());

router.post("/", upload.single("avatar"), catchErrors(createBusiness));

export default router;
