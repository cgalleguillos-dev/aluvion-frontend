'use client';

import { Event, IEventValves } from '@/config/interfaces'
import React from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, Tooltip);

interface Props {
  valves: IEventValves[] | Event[];
  title: string;
}

export const ValveTimeLine: React.FC<Props> = ({ valves, title }) => {


  const data = {
    labels: valves.map((valve) => valve.startTime),
    datasets: [
      {
        label: 'Intensidad',
        data: valves.map((valve) => valve.intensity),
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo (s)',
          color: 'black',
          font: {
            size: 12,
          },
        },
        ticks: {
          precision: 0,
        }
      },
      y: {
        title: {
          display: true,
          text: 'Intensidad (%)',
          color: 'black',
          font: {
            size: 12,
          },
        },
        ticks: {
          precision: 0,
        },

      }
    }

  }
  return (
    <>

      {/* <h4 className="text-2xl font-semibold text-gray-700 dark:text-white">
        {title}
      </h4> */}
      <Line options={options} data={data} />

    </>
  )
}
