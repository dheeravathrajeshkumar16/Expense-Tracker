import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Badge, ProgressBar } from "react-bootstrap";
import axios from "axios";
import { setBudgetAPI, getBudgetsAPI, deleteBudgetAPI } from "../utils/ApiRequest";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const BudgetModal = ({ show, handleClose, user, onBudgetUpdated, transactions = [] }) => {
  const categories = [
    "Groceries",
    "Rent",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    theme: "dark",
  };

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [limitAmount, setLimitAmount] = useState("");

  const fetchBudgets = async () => {
    if (!user?._id) return;
    try {
      const { data } = await axios.post(getBudgetsAPI, { userId: user._id });
      if (data.success) {
        setBudgets(data.budgets || []);
        if (onBudgetUpdated) {
          onBudgetUpdated(data.budgets || []);
        }
      }
    } catch (err) {
      console.error("Error fetching budgets:", err);
    }
  };

  useEffect(() => {
    if (show && user?._id) {
      fetchBudgets();
    }
  }, [show, user]);

  const handleSaveBudget = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !limitAmount) {
      toast.error("Please select a category and specify a limit amount", toastOptions);
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(setBudgetAPI, {
        userId: user._id,
        category: selectedCategory,
        limitAmount: Number(limitAmount),
      });

      if (data.success) {
        toast.success(data.message, toastOptions);
        setSelectedCategory("");
        setLimitAmount("");
        fetchBudgets();
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save budget limit", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBudget = async (budgetId, categoryName) => {
    try {
      const { data } = await axios.post(deleteBudgetAPI, {
        budgetId: budgetId,
        userId: user._id,
      });

      if (data.success) {
        toast.success(data.message, toastOptions);
        fetchBudgets();
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (err) {
      toast.error("Failed to delete budget limit", toastOptions);
    }
  };

  const handleEditClick = (b) => {
    setSelectedCategory(b.category);
    setLimitAmount(b.limitAmount);
  };

  // Helper to calculate current spent for category
  const getSpentForCategory = (catName) => {
    return transactions
      .filter((t) => t.transactionType === "expense" && t.category === catName)
      .reduce((acc, t) => acc + Number(t.amount || 0), 0);
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="budget-modal">
      <Modal.Header closeButton className="bg-dark text-white border-secondary">
        <Modal.Title className="d-flex align-items-center gap-2">
          <AccountBalanceWalletIcon className="text-warning" />
          <span>Category Budget Manager</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-white">
        <Form onSubmit={handleSaveBudget} className="p-3 mb-4 rounded border border-secondary bg-black bg-opacity-50">
          <h6 className="text-warning fw-bold mb-3">Set or Update Category Limit</h6>
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <Form.Group controlId="budgetCategorySelect">
                <Form.Label className="small text-secondary">Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-dark text-white border-secondary"
                  required
                >
                  <option value="">Choose Category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group controlId="budgetLimitInput">
                <Form.Label className="small text-secondary">Monthly Limit (₹)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 5000"
                  value={limitAmount}
                  onChange={(e) => setLimitAmount(e.target.value)}
                  className="bg-dark text-white border-secondary"
                  min="1"
                  required
                />
              </Form.Group>
            </div>
            <div className="col-md-2">
              <Button type="submit" variant="warning" className="w-100 fw-bold" disabled={loading}>
                {loading ? "Saving..." : "Save Limit"}
              </Button>
            </div>
          </div>
        </Form>

        <h6 className="text-white fw-bold mb-3">Active Category Limits ({budgets.length})</h6>
        {budgets.length === 0 ? (
          <div className="text-center py-4 text-muted bg-black bg-opacity-25 rounded">
            No budget limits defined yet. Set category limits above to start monitoring your spending!
          </div>
        ) : (
          <div className="table-responsive">
            <Table hover variant="dark" className="align-middle border-secondary mb-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Limit (₹)</th>
                  <th>Current Spend</th>
                  <th>Status & Progress</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.map((b) => {
                  const spent = getSpentForCategory(b.category);
                  const percent = Math.min(((spent / b.limitAmount) * 100), 100);
                  const isExceeded = spent >= b.limitAmount;
                  const isWarning = spent >= b.limitAmount * 0.8 && !isExceeded;

                  let variant = "success";
                  let statusBadge = <Badge bg="success">On Track</Badge>;
                  if (isExceeded) {
                    variant = "danger";
                    statusBadge = <Badge bg="danger" className="animate-pulse">Exceeded</Badge>;
                  } else if (isWarning) {
                    variant = "warning";
                    statusBadge = <Badge bg="warning" text="dark">Near Limit (≥80%)</Badge>;
                  }

                  return (
                    <tr key={b._id}>
                      <td className="fw-bold text-info">{b.category}</td>
                      <td>₹{b.limitAmount.toLocaleString()}</td>
                      <td className={isExceeded ? "text-danger fw-bold" : "text-white"}>
                        ₹{spent.toLocaleString()}
                      </td>
                      <td style={{ minWidth: "160px" }}>
                        <div className="d-flex align-items-center justify-content-between mb-1">
                          <small className="text-muted">{percent.toFixed(0)}%</small>
                          {statusBadge}
                        </div>
                        <ProgressBar
                          now={percent}
                          variant={variant}
                          style={{ height: "6px" }}
                        />
                      </td>
                      <td className="text-end">
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="me-2 p-1"
                          onClick={() => handleEditClick(b)}
                          title="Edit Limit"
                        >
                          <EditIcon fontSize="small" />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="p-1"
                          onClick={() => handleDeleteBudget(b._id, b.category)}
                          title="Delete Limit"
                        >
                          <DeleteIcon fontSize="small" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer className="bg-dark text-white border-secondary">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BudgetModal;
