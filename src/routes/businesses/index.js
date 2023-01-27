import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";

import {
  createBusiness,
  deleteBusinesses,
  getBusinessById,
  updateBusinessById,
  getBusinessesByUserId,
} from "@/controllers/businesses";
import { catchErrors } from "@/middlewares/error";
import { upload } from "@/middlewares/upload";

const router = express.Router();

router.use(verifySession());

router.post("/", upload.single("avatar"), catchErrors(createBusiness));
router.delete("/", catchErrors(deleteBusinesses));

router.get("/business-by-id/:id", catchErrors(getBusinessById));
router.put(
  "/business-by-id/:id",
  upload.single("avatar"),
  catchErrors(updateBusinessById)
);

router.get("/businesses-by-user-id/:id", catchErrors(getBusinessesByUserId));

export default router;
