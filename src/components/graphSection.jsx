import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import RadioButtons from "../common/radioButtons";
import { currencyFormatter } from "./../utils";
import Dropdown from "./dropdown";
import "./graphSection.css";

const GraphSection = ({ theme, expensesdata }) => {
  const years = [...new Set(expensesdata.map((year) => year.year))];
  const [selectedExpOrInc, setSelectedExpOrInc] = useState("expense");
  const [totalIncomeForYear, setTotalIncomeForYear] = useState(0);
  const [totalExpenseForYear, setTotalExpenseForYear] = useState(0);
  const [totalForYear, setTotalForYear] = useState(totalExpenseForYear);
  const [outputArray, setOutputArray] = useState(new Array(14).fill(0));
  const [dropdownYear, setDropdownYear] = useState(years[years.length - 1]);
  const [graphColors, setGraphColors] = useState(["#984673", "#36204e"]);

  const lightColors = ["#984673", "#36204e"];
  const darkColors = ["#0da6c2", "#7b78aa"];

  const filteredList = expensesdata.filter(
    (expense) => expense.year === dropdownYear
  );

  const filteredExpenses = filteredList.filter(
    (expense) => expense.expOrInc === "expense"
  );

  const filteredIncome = filteredList.filter(
    (expense) => expense.expOrInc === "income"
  );

  const onExpOrIncChange = (expOrInc) => {
    expOrInc === "expense"
      ? setTotalForYear(totalExpenseForYear)
      : setTotalForYear(totalIncomeForYear);
    setSelectedExpOrInc(expOrInc);
  };

  useEffect(() => {
    setGraphColors(theme === "dark" ? darkColors : lightColors);
  }, [theme]);

  useEffect(() => {
    const outputExpensesArray = new Array(14).fill(0);
    let totalExpenses = 0;

    if (selectedExpOrInc === "expense") {
      for (let item of filteredExpenses) {
        outputExpensesArray[item.month] += item.price;

        totalExpenses += item.price;
      }
    } else {
      for (let item of filteredIncome) {
        outputExpensesArray[item.month] += item.price;
        totalExpenses += item.price;
      }
    }

    let roundedArray = outputExpensesArray;
    roundedArray = roundedArray.map((number) => number.toFixed(2));

    setTotalForYear(totalExpenses);
    setOutputArray(roundedArray);

    const selectedExpense = filteredExpenses.reduce(
      (sum, expense) => (sum += expense.price),
      0
    );

    const selectedIncome = filteredIncome.reduce(
      (sum, expense) => (sum += expense.price),
      0
    );

    setTotalExpenseForYear(selectedExpense);
    setTotalIncomeForYear(selectedIncome);
  }, [dropdownYear, selectedExpOrInc]);

  const onYearChange = (year) => {
    setDropdownYear(year);
  };

  let state = {
    series: [
      {
        name: "2022",
        data: outputArray,
      },
    ],
    options: {
      chart: {
        width: 100,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: graphColors,
      fill: {
        type: "gradient",

        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.7,
          gradientFromColors: graphColors[0],
          opacityFrom: 0.9,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      grid: {
        borderColor: "#ffffff11",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1.2,
        colors: [graphColors[0]],
      },
      markers: {
        hover: {
          size: 3,
          sizeOffset: 15,
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "number",
        tickAmount: "dataPoints",
        decimalsInFloat: 2,
        categories: [" ", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, " "],
        labels: {
          style: {
            colors: graphColors[1],
            fontSize: "1rem",
            fontFamily: "Poppins",
            fontWeight: "bold",
          },
          offsetY: 8,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          stroke: {
            color: graphColors[1],
            width: 0.5,
            dashArray: 0,
          },
        },
        tooltip: {
          enabled: false,
        },
      },

      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex }) {
          return (
            `<div id="apex-chart">` +
            '<div class="arrow_box">' +
            "<span>" +
            series[seriesIndex][dataPointIndex] +
            " €" +
            "</span>" +
            "</div>" +
            " </div>"
          );
        },
      },
    },
  };

  return (
    <div className="row">
      <div className="greetings graphsGreetings">
        <h4 className="yearSelection">Year</h4>
        <Dropdown onYearChange={onYearChange} options={years} />
        <div className="totalSpendings">
          <h5>Total for the Year</h5>
          <h4>{currencyFormatter.format(totalForYear)}</h4>
        </div>
      </div>
      <div className="graphContainer">
        <div className="selection">
          <RadioButtons
            onExpOrIncChange={onExpOrIncChange}
            gliderType="graphRadio"
          />
        </div>

        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="area"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};
export default GraphSection;
