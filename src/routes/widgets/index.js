import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { createWidget } from "@/controllers/widgets";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.post("/", catchErrors(createWidget));

export default router;
