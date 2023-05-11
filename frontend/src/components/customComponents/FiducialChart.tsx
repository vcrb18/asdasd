import { Box } from "@mui/material";

import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Chart } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import ChartZoom from 'chartjs-plugin-zoom';
import React, {useEffect} from "react";
import { getExam} from "../../service/user.service";



ChartJS.register(
  annotationPlugin,
  CategoryScale,
  ArcElement,
  LinearScale,
  LineElement,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartZoom,
);

interface fidutialChartPoint {
  name:string;
  x:number;
  y:number;
}

interface fidutialChartPoints {
  0:fidutialChartPoint;
  1:fidutialChartPoint;
  2:fidutialChartPoint;
  3:fidutialChartPoint;
  4:fidutialChartPoint;
  5:fidutialChartPoint;
  6:fidutialChartPoint;
  7:fidutialChartPoint;
}

const FiducialChart = (props: any): JSX.Element => {
  const pointRadious = 4;

  const [timeseriesData, setTimeSeriesData] = React.useState<number[]> ([]);
  const [examId, setexamId] = React.useState<number>(props.examId);
  const [fidP, setfidP] = React.useState<number>(0);
  const [fidQRS, setfidQRS] = React.useState<number>(0);
  const [fidR, setfidR] = React.useState<number>(0);
  const [fidR2, setfidR2] = React.useState<number>(0);
  const [fidS, setfidS] = React.useState<number>(0);
  const [fidST, setfidST] = React.useState<number>(0);
  const [fidT, setfidT] = React.useState<number>(0);



  const points = [props.fidP, props.fidQRS, props.fidR, props.fidR2, props.fidS, props.fidST, props.fidT]



  const [maxX, setmaxX] = React.useState<number>(timeseriesData.length);

  const [minX, setminX] = React.useState<number>(0);
  const [maxY, setmaxY] = React.useState<number>(1000);

  const [minY, setminY] = React.useState<number>(-1000);



  const [changedZoom, setChangedZoom] = React.useState<boolean>(false);

  const [lineColor, setLineColor] = React.useState<string>("rgb(105,105,105)");


  function urgencyColorSwitcher(value: number | undefined): string {
    console.log(value);
    switch (value) {
      case undefined:
        return "black";
      case 1:
        return "green";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  }


  useEffect(() => {
    console.log("update tabla fiduciales")

    setexamId(props.examId);
    setfidP(props.fidP);
    setfidQRS(props.fidQRS);
    setfidR(props.fidR);
    setfidR2(props.fidR2);
    setfidS(props.fidS);
    setfidST(props.fidST);
    setfidT(props.fidT);
    setTimeSeriesData(props.timeSeries);
    if (!changedZoom){
    const maxP = Math.max(...points);
    const minP = Math.min(...points);
    setmaxX(maxP+100);  //si hay un punto que se pasa del largo de la time series se pasa del grafico
    setminX(minP-100);
    setmaxY(Math.max(...timeseriesData) + 100);
    setminY(Math.min(...timeseriesData) -100);

    }
    chart = ChartJS.getChart("fiduChart");
    if (!chart) return;
    chart.update();
}, [props]);

useEffect(() => {
  const maxP = Math.max(...points);
  const minP = Math.min(...points);
  setmaxX(maxP+100);  //si hay un punto que se pasa del largo de la time series se pasa del grafico
  setminX(minP-100);
  setmaxY(Math.max(...props.timeSeries) + 100);
  setminY(Math.min(...props.timeSeries) -100);
}, [props.timeSeries]);

useEffect(() => {
  getExam(examId).then(      
    (response) => {
      setLineColor(urgencyColorSwitcher(response.data.urgencia))
    }
  );
}, []);

  let chart = ChartJS.getChart("fiduChart");

  const timeseriesLabels = Array.from(
    { length: timeseriesData.length },
    (_, i) => i + 1
  );
  const pStartPoint = [{ x: fidP, y: timeseriesData[fidP] }, 1];
  const qrsStartPoint = [{ x: fidQRS, y: timeseriesData[fidQRS] }, 2];
  const rPoint = [{ x: fidR, y: timeseriesData[fidR] }, 3];
  const r2Point = [{ x: fidR2, y: timeseriesData[fidR2] }, 4];
  const qrsEndPoint = [{ x: fidS, y: timeseriesData[fidS] }, 5];
  const tStartPoint = [{ x: fidST, y: timeseriesData[fidST] }, 6];
  const tEndPoint = [{ x: fidT, y: timeseriesData[fidT] }, 7];

  let refLine:any;

  let lastEvent: any;
  let justUpdated = false as any;
  let bubble: any;
  let lastMovement:any;


  const drag = function (event: any, moveX: number, moveY: number, bubble: any): void {
    bubble[0].element.x += moveX;
    bubble[0].element.y += moveY;
    chart = ChartJS.getChart("fiduChart");
    if (!chart) return;
    if(!chart.data.datasets[bubble[0].datasetIndex].data) return;
    if(!chart.data.datasets[bubble[0].datasetIndex].data[0]) return;
    let num = chart.data.datasets[bubble[0].datasetIndex].data[0] as any;
    let box = chart.boxes[4] as any;
    let line = chart.data.datasets[7] as any;

    num.x += Math.round(moveX* ((box.max-box.min)/box.width));

    num.y = line.data[num.x];

    refLine.element.options.borderColor = "red";

    refLine.element.x = bubble[0].element.x;
    refLine.element.x2 = bubble[0].element.x;

    refLine.element.elements[0].width = 70;
    refLine.element.elements[0].x = bubble[0].element.x - refLine.element.elements[0].width/2;

    refLine.element.elements[0].options.content = num.x;

    refLine.element.elements[0].y = bubble[0].element.y -50;

  };

  const handleElementDragging = function (event: any, bubble:any): any {
    const moveX2 = event.x - lastMovement.x;
    const moveX = moveX2
    const moveY = event.y - lastMovement.y;
    drag(event, moveX, moveY, bubble);
    lastMovement = event;
    return true;
  };

  const handleParent = props.handleFiducialChartUpdate;

  const handleDrag = function (event: any, chart : any): any {
    if (true) {
      switch (event.type) {
        case "mousemove" || "touchmove":
          if(!bubble) break;
          if(!bubble[0]) break;
          if (!lastEvent || !bubble[0].element) break;
          if(lastEvent.type === "mousedown"){
            return handleElementDragging(event, bubble);
          }
          break;
        case "mouseout":
          lastEvent = undefined;
          break;
        case "mouseup" || "touchend":
          lastEvent = undefined;
          event.native.target.style.cursor = 'default';
          if(!bubble){
            chart.update();
            break;
          }
          if(!bubble[0]) break;
          bubble = undefined;

          setChangedZoom(true);

          setmaxX(chart.scales.x.max);
          setminX(chart.scales.x.min);
          setminY(chart.scales.y.min);
          setmaxY(chart.scales.y.max);

          setfidP(chart.data.datasets[0].data[0].x);
          setfidQRS(chart.data.datasets[1].data[0].x);
          setfidR(chart.data.datasets[2].data[0].x);
          setfidR2(chart.data.datasets[6].data[0].x);
          setfidS(chart.data.datasets[3].data[0].x);
          setfidST(chart.data.datasets[4].data[0].x);
          setfidT(chart.data.datasets[5].data[0].x);

          const childata = {
            exam_id:examId,
            p_start:chart.data.datasets[0].data[0].x,
            qrs_start:chart.data.datasets[1].data[0].x,
            r:chart.data.datasets[2].data[0].x,
            r2:chart.data.datasets[6].data[0].x,
            qrs_end:chart.data.datasets[3].data[0].x,
            t_start:chart.data.datasets[4].data[0].x,
            t_end:chart.data.datasets[5].data[0].x,
          }

          handleParent(childata);
          chart.update();

          break;
        case "mousedown" || "touchstart":
          lastEvent = event;
          lastMovement = event;
          bubble = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
          if(!bubble[0]) break;
          if (bubble[0].element){
            chart.config.options.plugins.tooltip.enabled = false;
            chart.config.options.plugins.zoom.pan.enabled = false;
            if (!justUpdated){
              justUpdated = true;
              chart.update();
            }
            justUpdated = false;
            event.native.target.style.cursor = 'grab';
          }
          else event.native.target.style.cursor = 'default';
          break;
        default:
      }
    }
  };

  const options = {
    events: [
      "mousedown" as const,
      "touchstart" as const,
      "mouseup" as const,
      "touchend" as const,
      "mousemove" as const,
      "touchmove" as const,
      "mouseout" as const,

    ],
    maintainAspectRatio: false,
    dragData: true,
    responsive: true,
    chartArea: {
      backgroundColor: "rgba(251, 85, 85, 0.4)",
    },
    background: "#FF0000",
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Puntos fiduciales",
      },
      tooltip:{
        bodyColor:'#fff',
        enabled: true,
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            modifierKey: 'ctrl',
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
          scaleMode: 'xy',
          onZoomStart: function (ctx: any) {
            setChangedZoom(true);
          },
        },
        limits: {
          x: {min: -100, max: timeseriesData.length + 100},
          y: {min: -2000, max: 2000}
        },
        pan: {
          enabled: true,
          mode: 'x',
          modifierKey: 'ctrl',
          onPanStart: function (ctx: any) {

            setChangedZoom(true);
            if(ctx.chart.getElementsAtEventForMode(ctx.event, 'nearest', { intersect: true }, true)[0] == undefined) return true;
            return false;
          }
        },
      },
      annotation: {
        annotations: [{

            type: 'line',
            id: 'referenceLine',
            borderColor: 'transparent',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            label: {
              drawTime:'afterDatasetsDraw',
              display: true,
              content: '',
              rotation: 0,
            },
            scaleID: 'x',
            value: points.reduce((a,b) => a + b, 0) / points.length,
            beforeDraw: function (context:any) {
              refLine = context;
            },
            z:1,
        }] as any,
        animation:false,
      }

    },
    tooltips: {
      enabled: false,
    },
    scales: {
      y: {
        title: {
          text: "VOLTAJE [mV]",
          display: false,
        },
        grid: {
          display: true,
        },
        min: minY,
        max: maxY,
      },
      x: {
        title: {
          text: "TIEMPO [ms]",
          display: true,
        },
        grid: {
          display: true,
        },
        min: minX,
        max: maxX
      },
    },

  } as any;

const data1 = {
  labels: timeseriesLabels,
  datasets: [
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "P",
      data: pStartPoint,
      spanGaps: true,
      borderColor: "rgb(237, 28, 36)",
      backgroundColor: "rgb(237, 28, 36)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "Q",
      data: qrsStartPoint,
      spanGaps: true,
      borderColor: "rgb(255, 127, 39)",
      backgroundColor: "rgb(255, 127, 39)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "R",
      data: rPoint,
      spanGaps: true,
      borderColor: "rgb(0, 162, 232)",
      backgroundColor: "rgb(0, 162, 232)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "S",
      data: qrsEndPoint,
      spanGaps: true,
      borderColor: "rgb(63, 72, 204)",
      backgroundColor: "rgb(63, 72, 204)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "ST",
      data: tStartPoint,
      spanGaps: true,
      borderColor: "rgb(255, 174, 201)",
      backgroundColor: "rgb(255, 174, 201)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "T",
      data: tEndPoint,
      spanGaps: true,
      borderColor: "rgb(163, 73, 164)",
      backgroundColor: "rgb(163, 73, 164)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointRadius: pointRadious,
      label: "R2",
      data: r2Point,
      spanGaps: true,
      borderColor: "rgb(30, 30, 30)",
      backgroundColor: "rgb(30, 30, 30)",
      dragData: true,
      dragX: true,
      z:3,
    },
    {

      type: "line" as const,
      label: "ECG",
      data: timeseriesData,
      backgroundColor: "rgb(139,139,139)",
      pointRadius: 0,
      pointHitRadius: 0,
      borderColor: lineColor,
      borderWidth: 1.5,
      z:2,

    },
  ],
};


const plugins = [{
  id: 'myEventCatcher',
  beforeEvent(chart:any, args:any, pluginOptions:any) {
    handleDrag(args.event, chart);
  }
},
ChartZoom]

  return (
    <Box sx={{ backgroundColor: "#FFFFFF", border: 2, borderColor: "#DDDDDD", minHeight: "30vh", position: "relative"}}>
      {timeseriesData.length > 0 ? (
        <Chart id="fiduChart"
        type="bubble"
        height="100vh"
        options={options}
        data={data1}
        plugins={plugins}
        updateMode="resize"
      />
      ) : ("Cargando Datos...")
      }
    </Box>
  );
};

export default FiducialChart;
