import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { getConnections, createConnection } from "@/controllers/connections/";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.get("/", catchErrors(getConnections));
router.post("/", catchErrors(createConnection));

export default router;
