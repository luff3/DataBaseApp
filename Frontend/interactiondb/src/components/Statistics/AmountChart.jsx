import React from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import revenueData from "./revenueData.json";
import amountOrderData from "./amountOrderData.json"
import { Bar, Doughnut, Line } from "react-chartjs-2";
import '../../styles/chartStyles.css'; 

const AmountChart = () => {
  return (
    <div className="dataCard revenueCard">
      <Line
        data={{
          labels: amountOrderData.map((data) => data.MonthYear),
          datasets: [
            {
              label: "Order Amount",
              data: amountOrderData.map((data) => data.OrderCount),
              backgroundColor: "#064FF0",
              borderColor: "#064FF0",
            },
            // {
            //   label: "Cost",
            //   data: revenueData.map((data) => data.cost),
            //   backgroundColor: "#FF3030",
            //   borderColor: "#FF3030",
            // },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          elements: {
            line: {
              tension: 0.5,
            },
          },
          plugins: {
            title: {
              text: "Monthly Revenue & Cost",
            },
          },
        }}
      />
    </div>
  );
};

export default AmountChart;
