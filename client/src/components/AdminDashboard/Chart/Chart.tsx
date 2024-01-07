import React, { useEffect, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useCategory } from "../../../api/GetApi";
import "./Chart.scss";
import { ICategory } from "../../Home/Category/Category";

const ChartComponent: React.FC = () => {
  const { data: categoryData }: any = useCategory();
  const chartContainerId = "uniqueContainerId";
  const chartRef: any = useRef<Chart | null>(null);

  const labels = categoryData?.map((category: ICategory) => category?.name);
  const dataValues = categoryData?.map(
    (category: ICategory) => category?.itemCount
  );
  const backgroundColors = generateRandomColors(categoryData?.length);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors,
      },
    ],
  };

  useEffect(() => {
    const chartContainer = document.getElementById(chartContainerId);

    if (!chartRef.current) {
      chartRef.current = new Chart(chartContainer as HTMLCanvasElement, {
        type: "pie",
        data,
      });
    }
  }, [data, chartContainerId]);

  function generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      colors.push(getRandomColor());
    }
    return colors;
  }
  function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className="chart-main">
      <h2>Category Counts</h2>
      <div id={chartContainerId}>
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ChartComponent;
