import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import revenueData from "./revenueData.json";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import '../../styles/chartStyles.css'; 
import { getStatistic, getStatisticPerMonth } from '../../services/statisticServices.js'

const AmountChart = () => {
  const [amountOrderData, setaAmountOrderData] = useState([]);
  const [moneyPerMonth, setMoneyPerMonth] = useState([]);

  useEffect(()=>{
    getData();
  },[])

const getData = () => {
  getStatistic()
  .then((data) => {
    setaAmountOrderData(data);
    console.log(data);
  })
  .catch((error) => {
      console.log(error);
  });

  getStatisticPerMonth().then((data) => {
    setMoneyPerMonth(data);
    console.log(data);
  })
  .catch((error) => {
    console.log(error)
  })

}

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
            {
              label: "Money Per Month",
              data: moneyPerMonth.map((data) => data.TotalAmount),
              backgroundColor: "#FF3030",
              borderColor: "#FF3030",
            },
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
