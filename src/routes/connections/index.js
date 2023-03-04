import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  getConnections,
  deleteConnections,
  createConnection,
  getConnectionsMetadata,
  createReport,
} from "@/controllers/connections";
import { catchErrors } from "@/middlewares/error";

const router = express.Router();

router.use(verifySession());

router.get("/", catchErrors(getConnections));
router.delete("/", catchErrors(deleteConnections));
router.post("/", catchErrors(createConnection));

router.get("/metadata", catchErrors(getConnectionsMetadata));

router.post("/reports", catchErrors(createReport));

export default router;
