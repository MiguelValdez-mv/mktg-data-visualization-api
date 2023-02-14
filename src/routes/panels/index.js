import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  createPanel,
  getPanelById,
  updatePanelById,
  deletePanelById,
  getPanelsByUserId,
} from "@/controllers/panels";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.post("/", catchErrors(createPanel));

router.get("/panel-by-id/:id", catchErrors(getPanelById));
router.put("/panel-by-id/:id", catchErrors(updatePanelById));
router.delete("/panel-by-id/:id", catchErrors(deletePanelById));

router.get("/panels-by-user-id/:id", catchErrors(getPanelsByUserId));

export default router;
