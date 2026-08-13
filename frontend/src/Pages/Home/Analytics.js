import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import CircularProgressBar from "../../components/CircularProgressBar";
import LineProgressBar from "../../components/LineProgressBar";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PieChartIcon from "@mui/icons-material/PieChart";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Analytics = ({ transactions = [] }) => {
  const TotalTransactions = transactions.length;

  const totalIncomeTransactions = transactions.filter(
    (item) => item.transactionType === "credit"
  );
  const totalExpenseTransactions = transactions.filter(
    (item) => item.transactionType === "expense"
  );

  const totalIncomePercent = TotalTransactions
    ? (totalIncomeTransactions.length / TotalTransactions) * 100
    : 0;
  const totalExpensePercent = TotalTransactions
    ? (totalExpenseTransactions.length / TotalTransactions) * 100
    : 0;

  const totalTurnOverIncome = totalIncomeTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount || 0),
    0
  );
  const totalTurnOverExpense = totalExpenseTransactions.reduce(
    (acc, transaction) => acc + Number(transaction.amount || 0),
    0
  );
  const netBalance = totalTurnOverIncome - totalTurnOverExpense;
  const totalTurnOver = totalTurnOverIncome + totalTurnOverExpense;

  const TurnOverIncomePercent = totalTurnOver
    ? (totalTurnOverIncome / totalTurnOver) * 100
    : 0;
  const TurnOverExpensePercent = totalTurnOver
    ? (totalTurnOverExpense / totalTurnOver) * 100
    : 0;

  const savingsRate = totalTurnOverIncome
    ? ((netBalance / totalTurnOverIncome) * 100).toFixed(1)
    : 0;

  const categories = [
    "Groceries",
    "Rent",
    "Salary",
    "Tip",
    "Food",
    "Medical",
    "Utilities",
    "Entertainment",
    "Transportation",
    "Other",
  ];

  const categoryColors = {
    Groceries: "#FF6384",
    Rent: "#36A2EB",
    Salary: "#FFCE56",
    Tip: "#4BC0C0",
    Food: "#9966FF",
    Medical: "#FF9F40",
    Utilities: "#8AC926",
    Entertainment: "#6A4C93",
    Transportation: "#1982C4",
    Other: "#F45B69",
  };

  // Prepare chart data for Expense Categories
  const expenseCategoryAmounts = categories.map((cat) =>
    transactions
      .filter(
        (t) => t.transactionType === "expense" && t.category === cat
      )
      .reduce((acc, t) => acc + Number(t.amount || 0), 0)
  );

  const activeExpenseCategories = categories.filter(
    (_, index) => expenseCategoryAmounts[index] > 0
  );
  const activeExpenseAmounts = expenseCategoryAmounts.filter(
    (amount) => amount > 0
  );
  const activeExpenseColors = activeExpenseCategories.map(
    (cat) => categoryColors[cat]
  );

  const expenseChartData = {
    labels: activeExpenseCategories,
    datasets: [
      {
        data: activeExpenseAmounts,
        backgroundColor: activeExpenseColors,
        borderWidth: 2,
        borderColor: "#1a1a2e",
      },
    ],
  };

  // Bar Chart Data for Overview
  const overviewBarData = {
    labels: ["Income vs Expense"],
    datasets: [
      {
        label: "Income",
        data: [totalTurnOverIncome],
        backgroundColor: "#2ea44f",
        borderRadius: 6,
      },
      {
        label: "Expense",
        data: [totalTurnOverExpense],
        backgroundColor: "#cb2431",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          font: { size: 12, weight: "bold" },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Container className="mt-4 mb-5">
      {/* Top Banner - Summary Cards */}
      <Row className="g-3 mb-4">
        <Col lg={3} md={6}>
          <Card className="summary-card bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-wrapper bg-primary bg-opacity-25 text-primary p-3 rounded-circle me-3">
                <AccountBalanceWalletIcon fontSize="large" />
              </div>
              <div>
                <small className="text-secondary uppercase tracking-wider">Net Balance</small>
                <h3 className={`mb-0 fw-bold ${netBalance >= 0 ? "text-success" : "text-danger"}`}>
                  ₹{netBalance.toLocaleString()}
                </h3>
                <small className="text-muted">Rate: {savingsRate}% Saved</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="summary-card bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-wrapper bg-success bg-opacity-25 text-success p-3 rounded-circle me-3">
                <TrendingUpIcon fontSize="large" />
              </div>
              <div>
                <small className="text-secondary">Total Income</small>
                <h3 className="mb-0 fw-bold text-success">
                  ₹{totalTurnOverIncome.toLocaleString()}
                </h3>
                <small className="text-muted">{totalIncomeTransactions.length} Transactions</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="summary-card bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-wrapper bg-danger bg-opacity-25 text-danger p-3 rounded-circle me-3">
                <TrendingDownIcon fontSize="large" />
              </div>
              <div>
                <small className="text-secondary">Total Expense</small>
                <h3 className="mb-0 fw-bold text-danger">
                  ₹{totalTurnOverExpense.toLocaleString()}
                </h3>
                <small className="text-muted">{totalExpenseTransactions.length} Transactions</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="summary-card bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Body className="d-flex align-items-center">
              <div className="icon-wrapper bg-info bg-opacity-25 text-info p-3 rounded-circle me-3">
                <PieChartIcon fontSize="large" />
              </div>
              <div>
                <small className="text-secondary">Total Turnover</small>
                <h3 className="mb-0 fw-bold text-info">
                  ₹{totalTurnOver.toLocaleString()}
                </h3>
                <small className="text-muted">{TotalTransactions} Total Logged</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Interactive Charts Section */}
      <Row className="g-4 mb-4">
        <Col lg={6}>
          <Card className="bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Header className="bg-black text-white fw-bold d-flex align-items-center justify-content-between">
              <span>Expense Category Distribution</span>
              <span className="badge bg-danger">Expense</span>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
              {activeExpenseAmounts.length > 0 ? (
                <div style={{ width: "100%", height: "280px" }}>
                  <Doughnut data={expenseChartData} options={chartOptions} />
                </div>
              ) : (
                <p className="text-muted my-5">No expense data available for this range.</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="bg-dark text-white border-secondary h-100 shadow-sm">
            <Card.Header className="bg-black text-white fw-bold d-flex align-items-center justify-content-between">
              <span>Income vs Expense Comparison</span>
              <span className="badge bg-primary">Overview</span>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center" style={{ minHeight: "300px" }}>
              <div style={{ width: "100%", height: "280px" }}>
                <Bar data={overviewBarData} options={chartOptions} />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detail Metrics Breakdown Grid */}
      <Row className="g-4">
        <Col lg={3} md={6}>
          <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
            <Card.Header className="bg-black text-white fw-bold">
              Transaction Ratio
            </Card.Header>
            <Card.Body>
              <h5 className="text-success mb-2">
                Income: <ArrowDropUpIcon /> {totalIncomeTransactions.length}
              </h5>
              <h5 className="text-danger mb-4">
                Expense: <ArrowDropDownIcon /> {totalExpenseTransactions.length}
              </h5>

              <div className="d-flex justify-content-center my-3">
                <CircularProgressBar
                  percentage={totalIncomePercent.toFixed(0)}
                  color="green"
                />
              </div>

              <div className="d-flex justify-content-center my-3">
                <CircularProgressBar
                  percentage={totalExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
            <Card.Header className="bg-black text-white fw-bold">
              Turnover Split
            </Card.Header>
            <Card.Body>
              <h5 className="text-success mb-2">
                Income: <ArrowDropUpIcon /> ₹{totalTurnOverIncome.toLocaleString()}
              </h5>
              <h5 className="text-danger mb-4">
                Expense: <ArrowDropDownIcon /> ₹{totalTurnOverExpense.toLocaleString()}
              </h5>

              <div className="d-flex justify-content-center my-3">
                <CircularProgressBar
                  percentage={TurnOverIncomePercent.toFixed(0)}
                  color="green"
                />
              </div>

              <div className="d-flex justify-content-center my-3">
                <CircularProgressBar
                  percentage={TurnOverExpensePercent.toFixed(0)}
                  color="red"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
            <Card.Header className="bg-black text-white fw-bold">
              Category Income %
            </Card.Header>
            <Card.Body style={{ maxHeight: "360px", overflowY: "auto" }}>
              {categories.map((category) => {
                const income = transactions
                  .filter(
                    (t) => t.transactionType === "credit" && t.category === category
                  )
                  .reduce((acc, t) => acc + Number(t.amount || 0), 0);

                const incomePercent = totalTurnOver ? (income / totalTurnOver) * 100 : 0;

                return (
                  <React.Fragment key={category}>
                    {income > 0 && (
                      <LineProgressBar
                        label={category}
                        percentage={incomePercent.toFixed(0)}
                        lineColor={categoryColors[category]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
            <Card.Header className="bg-black text-white fw-bold">
              Category Expense %
            </Card.Header>
            <Card.Body style={{ maxHeight: "360px", overflowY: "auto" }}>
              {categories.map((category) => {
                const expenses = transactions
                  .filter(
                    (t) => t.transactionType === "expense" && t.category === category
                  )
                  .reduce((acc, t) => acc + Number(t.amount || 0), 0);

                const expensePercent = totalTurnOver ? (expenses / totalTurnOver) * 100 : 0;

                return (
                  <React.Fragment key={category}>
                    {expenses > 0 && (
                      <LineProgressBar
                        label={category}
                        percentage={expensePercent.toFixed(0)}
                        lineColor={categoryColors[category]}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Analytics;
