"use client";

import '../globals.css';  // Import global styles (Tailwind CSS setup)
import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Axios for making API requests
import Highcharts from 'highcharts/highstock';  // Import Highstock for financial charts like candlestick
import HighchartsReact from 'highcharts-react-official';  // Highcharts React wrapper
import { Line, Bar, Pie } from 'react-chartjs-2';  // Import Line, Bar, Pie charts from chart.js
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

// Registering necessary Chart.js components
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

// Interface for chart data structure expected from the backend
interface ChartDataResponse {
  labels: string[];
  data: number[];
}

interface CandlestickDataResponse {
  data: { x: string; open: number; high: number; low: number; close: number }[];
}

const Dashboard = () => {
  // State for storing chart data for Line, Bar, Pie charts
  const [lineChartData, setLineChartData] = useState<ChartData<'line'>>({ datasets: [] });
  const [barChartData, setBarChartData] = useState<ChartData<'bar'>>({ datasets: [] });
  const [pieChartData, setPieChartData] = useState<ChartData<'pie'>>({ datasets: [] });
  
  // State for storing options/config for the candlestick chart
  const [candlestickOptions, setCandlestickOptions] = useState<any>(null);

  useEffect(() => {
    // Fetch data for the candlestick chart from the Django API
    axios.get<CandlestickDataResponse>('http://localhost:8000/api/candlestick-chart-data/')
      .then(response => {
        const candlestickData = response.data.data.map(item => [
          new Date(item.x).getTime(),
          item.open,
          item.high,
          item.low,
          item.close
        ]);

        // Configure candlestick chart options for Highcharts
        setCandlestickOptions({
          rangeSelector: {
            selected: 1
          },
          title: {
            text: ''  // Remove internal Highcharts title
          },
          series: [{
            type: 'candlestick',
            name: 'Stock Price',
            data: candlestickData,
            tooltip: {
              valueDecimals: 2
            }
          }]
        });
      })
      .catch(err => console.error("Error fetching candlestick data", err));

    // Fetch data for the line chart from the Django API
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

    // Fetch data for the bar chart from the Django API
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

    // Fetch data for the pie chart from the Django API
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
    <div className="min-h-screen flex flex-col justify-center bg-white">
      <div className="container mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">Dashboard</h1>

        {/* Responsive Grid Layout for Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Line Chart */}
          <div className="p-6 bg-white shadow-md rounded-md transition-transform duration-300 hover:scale-105 h-[400px] flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Line Chart</h2>
            <div className="flex-1">
              {lineChartData && <Line data={lineChartData} options={{ maintainAspectRatio: false }} />}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="p-6 bg-white shadow-md rounded-md transition-transform duration-300 hover:scale-105 h-[400px] flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Bar Chart</h2>
            <div className="flex-1">
              {barChartData && <Bar data={barChartData} options={{ maintainAspectRatio: false }} />}
            </div>
          </div>

          {/* Pie Chart */}
          <div className="p-6 bg-white shadow-md rounded-md transition-transform duration-300 hover:scale-105 h-[400px] flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Pie Chart</h2>
            <div className="flex-1 flex justify-center items-center">
              {pieChartData && (
                <div className="w-[250px] h-[250px]">
                  <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                </div>
              )}
            </div>
          </div>

          {/* Candlestick Chart */}
          <div className="p-6 bg-white shadow-md rounded-md transition-transform duration-300 hover:scale-105 h-[400px] flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4 text-center text-black">Candlestick Chart</h2>
            {candlestickOptions && (
              <HighchartsReact
                highcharts={Highcharts}
                constructorType={'stockChart'}
                options={candlestickOptions}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting Dashboard component as default
export default Dashboard;
