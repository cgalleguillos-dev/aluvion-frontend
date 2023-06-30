'use client';

import { IEventValves } from '@/config/interfaces'
import React from 'react'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

interface Props {
  valves: IEventValves[];
  title: string;
}

export const ValveTimeLine: React.FC<Props> = ({ valves, title }) => {
  const valvesOrdenadas = [...valves].sort(
    (a, b) => parseInt(a.time) - parseInt(b.time)
  );

  const data = {
    labels: valvesOrdenadas.map((valve) => valve.time),
    datasets: [
      {
        label: 'Time Line',
        data: valvesOrdenadas.map((valve) => valve.intensity),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };
  return (
    <>

      <h4 className="text-2xl font-semibold text-gray-700 dark:text-white">
        {title}
      </h4>
      <Line data={data} />

    </>
  )
}
