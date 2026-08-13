import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    limitAmount: {
        type: Number,
        required: [true, "Budget limit amount is required"],
        min: [0, "Budget limit cannot be negative"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Ensure a user can only have one budget setting per category
budgetSchema.index({ user: 1, category: 1 }, { unique: true });

const Budget = mongoose.model("Budget", budgetSchema);

export default Budget;
