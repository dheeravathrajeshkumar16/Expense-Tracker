import express from "express";
import {
  setBudgetController,
  getBudgetsController,
  deleteBudgetController,
} from "../controllers/budgetController.js";

const router = express.Router();

router.route("/setBudget").post(setBudgetController);
router.route("/getBudgets").post(getBudgetsController);
router.route("/deleteBudget").post(deleteBudgetController);

export default router;
