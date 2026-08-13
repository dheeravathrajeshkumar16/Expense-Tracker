import Budget from "../models/BudgetModel.js";
import User from "../models/UserSchema.js";

export const setBudgetController = async (req, res) => {
  try {
    const { userId, category, limitAmount } = req.body;

    if (!userId || !category || limitAmount === undefined || limitAmount === null) {
      return res.status(400).json({
        success: false,
        message: "Please provide userId, category, and limitAmount",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const numericLimit = Number(limitAmount);
    if (isNaN(numericLimit) || numericLimit < 0) {
      return res.status(400).json({
        success: false,
        message: "Limit amount must be a positive number",
      });
    }

    const updatedBudget = await Budget.findOneAndUpdate(
      { user: userId, category: category },
      { limitAmount: numericLimit },
      { new: true, upsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: `Budget for ${category} set to ₹${numericLimit.toLocaleString()}`,
      budget: updatedBudget,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBudgetsController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required",
      });
    }

    const budgets = await Budget.find({ user: userId });

    return res.status(200).json({
      success: true,
      budgets: budgets,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBudgetController = async (req, res) => {
  try {
    const { budgetId, userId } = req.body;

    if (!budgetId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide budgetId and userId",
      });
    }

    const deletedBudget = await Budget.findOneAndDelete({
      _id: budgetId,
      user: userId,
    });

    if (!deletedBudget) {
      return res.status(404).json({
        success: false,
        message: "Budget limit not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Budget limit for ${deletedBudget.category} deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
