import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import { createWidget, getWidgetsByPanelId } from "@/controllers/widgets";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.post("/", catchErrors(createWidget));

router.get("/widgets-by-panel-id/:id", catchErrors(getWidgetsByPanelId));

export default router;
