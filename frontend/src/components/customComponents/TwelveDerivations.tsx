import React, { useRef, useEffect } from 'react';
import Chart, { ChartData, ChartOptions } from 'chart.js/auto';

interface LineChartProps {
  data: number[];
  id: string;
  max_points: number;
  options?: ChartOptions;
  width?: number | string ;
  height?: number | string ;
}

const LineChart: React.FC<LineChartProps> = ({ id, data, max_points, options, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let n_x_ticks = max_points / 100;
  let sliced_data = data.slice(0,max_points);

  useEffect(() => {
    if (canvasRef.current) {
      const chart = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels: sliced_data.map((_, index) => index.toString()),
          datasets: [
            {
              label: 'My Data',
              data,
              fill: false,
              borderColor: 'rgb(34,139,34)',
              backgroundColor: 'rgb(255,255,255)',
              borderWidth: 1.5,
              pointRadius: 0,
              pointHitRadius: 0,
              spanGaps: true // enable for a single dataset
            },
          ],
        },
        options: {
          scales: {
            x: {
              ticks: {
                display: false,
                maxTicksLimit: n_x_ticks,
                stepSize: 200,
              },
              title: {
                display: false,
              },
            },
            y: {
              ticks: {
                display: false,
                stepSize: 500,
                maxTicksLimit: 10,
              },
              title: {
                text: 'VOLTAJE [mV]',
                display: false,
              },
              min: -1500,
              max: 1500,
            },
          },
          plugins: {
            decimation: {
                enabled: true,
                algorithm: 'min-max',
            },
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                fullSize: true,
                position: "top",
                // font: "",
                align: "start" ,
                text: id,
            },
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
          },
          animation: false,
          ...options,
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [canvasRef, sliced_data, options]);

  return <canvas id={id} height={height} width={width} ref={canvasRef} />;
};

export default LineChart;
