"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { ChartData } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataResponse {
  labels: string[];
  data: number[];
}

const Dashboard = () => {
  const [lineChartData, setLineChartData] = useState<ChartData<'line'>>({ datasets: [] });
  const [barChartData, setBarChartData] = useState<ChartData<'bar'>>({ datasets: [] });
  const [pieChartData, setPieChartData] = useState<ChartData<'pie'>>({ datasets: [] });

  useEffect(() => {
    axios.get<ChartDataResponse>('http://localhost:8000/api/line-chart-data/')
      .then(response => {
        setLineChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Line Chart',
            data: response.data.data,
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1,
          }]
        });
      }).catch(err => console.error("Error fetching line chart data", err));

    axios.get<ChartDataResponse>('http://localhost:8000/api/bar-chart-data/')
      .then(response => {
        setBarChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Bar Chart',
            data: response.data.data,
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
            borderWidth: 1,
          }]
        });
      }).catch(err => console.error("Error fetching bar chart data", err));

    axios.get<ChartDataResponse>('http://localhost:8000/api/pie-chart-data/')
      .then(response => {
        setPieChartData({
          labels: response.data.labels,
          datasets: [{
            label: 'Pie Chart',
            data: response.data.data,
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverOffset: 4,
          }]
        });
      }).catch(err => console.error("Error fetching pie chart data", err));
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
        <div className="bg-white p-4 shadow-md rounded-md">
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
        <div className="bg-white p-4 shadow-md rounded-md">
          <Bar data={barChartData} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Pie Chart</h2>
        <div className="bg-white p-4 shadow-md rounded-md">
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

// Make sure the default export is a React component
export default Dashboard;
