import React, { useEffect, useState } from "react";
import styled from "styled-components";
import OverViewComponent from "./OverViewComponent";
import TransactionsComponent from "./TransactionsComponent";
import { BarChart } from '../../components/BarChart'
import { PieChart } from "../../components/PieChart";

const Container = styled.div`
  background-color: white;
  color: #0d1d2c;
  display: flex;
  flex-direction: column;
  padding: 10px 22px;
  font-size: 18px;
  width: 360px;
  align-items: center;
  justify-content: space-between;
`;

const HomeComponent = (props) => {
    const [transactions, updateTransaction] = useState([]);
    const [expense, updateExpense] = useState(0);
    const [income, updateIncome] = useState(0);

    const calculateBalance = () => {
        let exp = 0;
        let inc = 0;
        transactions.map((payload) =>
            payload.type === "EXPENSE"
                ? (exp = exp + payload.amount)
                : (inc = inc + payload.amount),
        );
        updateExpense(exp);
        updateIncome(inc);
    };
    useEffect(() => calculateBalance(), [transactions]);

    const addTransaction = (payload) => {
        const transactionArray = [...transactions];
        transactionArray.push(payload);
        updateTransaction(transactionArray);
    };

    const labels = transactions?.filter((trns) => trns.type === "INCOME")?.map((trns) => trns["desc"]);

    const incomeData = {
        labels,
        datasets: [
            {
                label: 'Amount',
                data: transactions?.filter((trns) => trns.type === "INCOME")?.map((trns) => trns.amount),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    const expenseData = {
        labels: transactions?.filter((trns) => trns.type === "EXPENSE")?.map((trns) => trns["desc"]),
        datasets: [
            {
                label: 'Amount',
                data: transactions?.filter((trns) => trns.type === "EXPENSE")?.map((trns) => trns.amount),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Container>
            <OverViewComponent
                expense={expense}
                income={income}
                addTransaction={addTransaction}
            />
            {transactions?.length ? (
                <TransactionsComponent transactions={transactions} />
            ) : (
                ""
            )}

            <BarChart data={incomeData} />
            <PieChart data={expenseData} />
        </Container>
    );
};
export default HomeComponent;