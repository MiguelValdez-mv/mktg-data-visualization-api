import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { createPanel } from "@/controllers/panels";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.post("/", catchErrors(createPanel));

export default router;
