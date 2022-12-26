import express from "express";

import { checkUserExistenceByEmail } from "@/controllers/users";

const router = express.Router();

router.get("/check-user-existence/:email", checkUserExistenceByEmail);

export default router;
