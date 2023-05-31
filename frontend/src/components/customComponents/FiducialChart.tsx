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
  const pointRadious = 15;
  const pointLineLength = 500;
  

  const [timeseriesData, setTimeSeriesData] = React.useState<number[]> ([]);
  const [examId, setexamId] = React.useState<number>(props.examId);

  const [fidP, setfidP] = React.useState<number>(0);
  const [fidQRS, setfidQRS] = React.useState<number>(0);
  const [fidR, setfidR] = React.useState<number>(0);
  const [fidR2, setfidR2] = React.useState<number>(0);
  const [fidS, setfidS] = React.useState<number>(0);
  const [fidST, setfidST] = React.useState<number>(0);
  const [fidT, setfidT] = React.useState<number>(0);

  const [fidPY, setfidPY] = React.useState<number>(0);
  const [fidQRSY, setfidQRSY] = React.useState<number>(0);
  const [fidRY, setfidRY] = React.useState<number>(0);
  const [fidR2Y, setfidR2Y] = React.useState<number>(0);
  const [fidSY, setfidSY] = React.useState<number>(0);
  const [fidSTY, setfidSTY] = React.useState<number>(0);
  const [fidTY, setfidTY] = React.useState<number>(0);

  



  const points = [props.fidP, props.fidQRS, props.fidR, props.fidR2, props.fidS, props.fidST, props.fidT]
  
  const allPoints = [fidP, fidQRS, fidR, fidR2, fidS, fidST, fidT]



  const [maxX, setmaxX] = React.useState<number>(timeseriesData.length);

  const [minX, setminX] = React.useState<number>(0);
  const [maxY, setmaxY] = React.useState<number>(1000);

  const [minY, setminY] = React.useState<number>(-1000);



  const [changedZoom, setChangedZoom] = React.useState<boolean>(false);

  const [lineColor, setLineColor] = React.useState<string>("rgb(105,105,105)");


  function urgencyColorSwitcher(value: number | undefined): string {
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

    setexamId(props.examId);

    setfidP(props.fidP);
    setfidQRS(props.fidQRS);
    setfidR(props.fidR);
    setfidR2(props.fidR2);
    setfidS(props.fidS);
    setfidST(props.fidST);
    setfidT(props.fidT);

    setfidPY(props.timeSeries[props.fidP] + pointLineLength);
    setfidQRSY(props.timeSeries[props.fidQRS] - pointLineLength);
    setfidRY(props.timeSeries[props.fidR] + pointLineLength);
    setfidR2Y(props.timeSeries[props.fidR2] + pointLineLength);
    setfidSY(props.timeSeries[props.fidS] - pointLineLength);
    setfidSTY(props.timeSeries[props.fidST] + pointLineLength);
    setfidTY(props.timeSeries[props.fidT] + pointLineLength);

    setTimeSeriesData(props.timeSeries);
    if (!changedZoom){
    const maxPoint = Math.max(...points);
    const minPoint = Math.min(...points);
    let xAxisOffsetLeft = (5000 - (maxPoint - minPoint))/2;
    let xAxisOffsetRight = (5000 - (maxPoint - minPoint))/2;

    if(minPoint-xAxisOffsetLeft<0)
    {
      xAxisOffsetRight-= minPoint-xAxisOffsetLeft;
      xAxisOffsetLeft = minPoint;
    }

    if(maxPoint+xAxisOffsetRight > timeseriesData.length)
    {
      xAxisOffsetLeft += maxPoint + xAxisOffsetRight - timeseriesData.length;
      xAxisOffsetRight = timeseriesData.length- maxPoint;
    }
    

    const maxTimeSeries = Math.max(...timeseriesData);
    const minTimeSeries = Math.min(...timeseriesData);
    const yAxisOffset = (2500 - (maxTimeSeries-minTimeSeries))/2;
    setmaxX(maxPoint + xAxisOffsetRight);
    setminX(minPoint - xAxisOffsetLeft);
    setmaxY(maxTimeSeries + 1000);
    setminY(minTimeSeries -1000);

    }
    chart = ChartJS.getChart("fiduChart");
    if (!chart) return;
    chart.update();
}, [props]);

useEffect(() => {

  const maxPoint = Math.max(...points);
  const minPoint = Math.min(...points);
  let xAxisOffsetLeft = (5000 - (maxPoint - minPoint))/2;
  let xAxisOffsetRight = (5000 - (maxPoint - minPoint))/2;

  if(minPoint-xAxisOffsetLeft<0)
  {
    xAxisOffsetRight-= minPoint-xAxisOffsetLeft;
    xAxisOffsetLeft = minPoint;
  }

  if(maxPoint + xAxisOffsetRight>props.timeSeries.length)
  {
    xAxisOffsetLeft += maxPoint + xAxisOffsetRight - props.timeSeries.length;
    xAxisOffsetRight = props.timeSeries.length - maxPoint;
  }


  const maxTimeSeries = Math.max(...props.timeSeries);
  const minTimeSeries = Math.min(...props.timeSeries);
  const yAxisOffset = (2500 - (maxTimeSeries-minTimeSeries))/2;
  setmaxX(maxPoint + xAxisOffsetRight);
  setminX(minPoint - xAxisOffsetLeft);
  setmaxY(maxTimeSeries + 1000);
  setminY(minTimeSeries - 1000);
}, [props.timeSeries]);

useEffect(() => {
  getExam(examId).then(      
    (response) => {
      setLineColor(urgencyColorSwitcher(response.data.urgency))
    }
  );
}, []);

  let chart = ChartJS.getChart("fiduChart");

  const timeseriesLabels = Array.from(
    { length: timeseriesData.length },
    (_, i) => i + 1
  );
  const pStartPoint = [{ x: fidP, y: fidPY} as any, 1];
  const qrsStartPoint = [{ x: fidQRS, y: fidQRSY} as any, 2];
  const rPoint = [{ x: fidR, y: fidRY} as any, 3];
  const r2Point = [{ x: fidR2, y: fidR2Y} as any, 4];
  const qrsEndPoint = [{ x: fidS, y: fidSY} as any, 5];
  const tStartPoint = [{ x: fidST, y: fidSTY} as any, 6];
  const tEndPoint = [{ x: fidT, y: fidTY} as any, 7];

  let n_x_ticks = timeseriesData.length / 100;

  let refLabel:any;

  let leftBorderArea : any;
  let rightBorderArea : any;


  let pointLines = [] as any;
  let pointLabels = [] as any;

  let lastEvent: any;
  let justUpdated = false as any;
  let bubble: any;
  let lastMovement:any;
  let lastX = -1;

  let lastMovedIndex = 0;

  let lastData = {
    examId:examId,
    pStart:props.fidP,
    qrsStart:props.fidQRS,
    r:props.fidR,
    r2:props.fidR2,
    qrsEnd:props.fidS,
    tStart:props.fidT,
    tEnd:props.fidST,
  } as any;

  



  const getBubble = function (event: any, chart : any): any {
    const elements = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
    return(elements);
  }

  const moveOnePoint = function (chart: any): any 
  {
    setmaxX(chart.scales.x.max);
    setminX(chart.scales.x.min);

    setfidP(chart.data.datasets[0].data[0].x);
    setfidQRS(chart.data.datasets[1].data[0].x);
    setfidR(chart.data.datasets[2].data[0].x);
    setfidR2(chart.data.datasets[6].data[0].x);
    setfidS(chart.data.datasets[3].data[0].x);
    setfidST(chart.data.datasets[4].data[0].x);
    setfidT(chart.data.datasets[5].data[0].x);

    const childata = {
      examId:examId,
      pStart:chart.data.datasets[0].data[0].x,
      qrsStart:chart.data.datasets[1].data[0].x,
      r:chart.data.datasets[2].data[0].x,
      r2:chart.data.datasets[6].data[0].x,
      qrsEnd:chart.data.datasets[3].data[0].x,
      tStart:chart.data.datasets[4].data[0].x,
      tEnd:chart.data.datasets[5].data[0].x,
    }

    return childata;
  }

  const moveAllPoints = function (event: any, direction: string, chart:any): any {
    let movement = chart.data.datasets[lastMovedIndex].data[0].x - lastData[chart.data.datasets[lastMovedIndex].altLabel];

    const values = Object.values(lastData) as any;

    if (Math.max(...values.slice(1,7)) + movement > timeseriesData.length ||  Math.min(...values.slice(1,7)) + movement < 0) 
      movement = 0;

    let scaleMovement = movement;
    if (chart.scales.x.max + movement >= timeseriesData.length)
      scaleMovement = timeseriesData.length + 100 - chart.scales.x.max;
    if (chart.scales.x.min + movement <= 0)
      scaleMovement = - 100 - chart.scales.x.min;

      
    setmaxX(chart.scales.x.max + scaleMovement);
    setminX(chart.scales.x.min + scaleMovement);
    

    setfidP(lastData.pStart + movement);
    setfidQRS(lastData.qrsStart + movement);
    setfidR(lastData.r + movement);
    setfidR2(lastData.r2 + movement);
    setfidS(lastData.qrsEnd + movement);
    setfidST(lastData.tEnd + movement);
    setfidT(lastData.tStart + movement);

    const childata = {
      examId: examId,
      pStart: lastData.pStart + movement,
      qrsStart: lastData.qrsStart + movement,
      r: lastData.r + movement,
      r2: lastData.r2 + movement,
      qrsEnd: lastData.qrsEnd + movement,
      tStart: lastData.tEnd + movement,
      tEnd: lastData.tStart + movement,
    }

    return childata;
  }

  const checkForBorderHover = function (event:any, chart:any)
  {
    const movement = chart.data.datasets[lastMovedIndex].data[0].x - lastData[chart.data.datasets[lastMovedIndex].altLabel];
    let hoveredBackgroundColor = 'rgba(0, 214, 176, 0.58)';
    let hoveredBorderColor = 'rgba(11, 175, 146, 0.58)';
    const values = Object.values(lastData) as any;
    
    if (event.x <= chart.chartArea.left + chart.chartArea.width/8)
    {
      if (Math.min(...values.slice(1,7)) + movement < 0)
      {
        hoveredBackgroundColor = 'rgba(255, 11, 11, 0.53)';
        hoveredBorderColor = 'rgba(237, 9, 9, 0.72)';
      }
      leftBorderArea.element.options.backgroundColor = hoveredBackgroundColor;
      leftBorderArea.element.options.borderColor = hoveredBorderColor;
    }
    else if (event.x >= chart.chartArea.width + chart.chartArea.left - chart.chartArea.width/8)
    {
      if (Math.max(...values.slice(1,7)) + movement > timeseriesData.length)
      {
        hoveredBackgroundColor = 'rgba(255, 11, 11, 0.53)';
        hoveredBorderColor = 'rgba(237, 9, 9, 0.72)';
      }
      rightBorderArea.element.options.backgroundColor = hoveredBackgroundColor;
      rightBorderArea.element.options.borderColor = hoveredBorderColor;
    }
    else
    {
      leftBorderArea.element.options.backgroundColor = 'rgba(243, 167, 144, 0.15)';
      rightBorderArea.element.options.backgroundColor = 'rgba(243, 167, 144, 0.15)';
      leftBorderArea.element.options.borderColor = 'rgba(243, 167, 144, 0.58)';
      rightBorderArea.element.options.borderColor = 'rgba(243, 167, 144, 0.58)';
    }
  }



  const drag = function (event: any, moveX: number, moveY: number, bubble: any): void {
    bubble[0].element.x += moveX;
    bubble[0].element.y += moveY;
    chart = ChartJS.getChart("fiduChart");
    if (!chart) return;
    checkForBorderHover(event, chart);
    if(!chart.data.datasets[bubble[0].datasetIndex].data) return;
    if(!chart.data.datasets[bubble[0].datasetIndex].data[0]) return;
    let num = chart.data.datasets[bubble[0].datasetIndex].data[0] as any;
    let line = chart.data.datasets[7] as any;
    const index = bubble[0].datasetIndex;
    lastMovedIndex = index;
    const realX = chart.scales.x.getValueForPixel(bubble[0].element.x) as number;
    const realY = chart.scales.y.getValueForPixel(bubble[0].element.y) as number;
    num.x = Math.round(realX);

    num.y = Math.round(realY);

    refLabel.element.options.content = ` ${num.x}`;

    pointLines[index].element.y2 += moveY;
    pointLines[index].element.x = bubble[0].element.x;
    pointLines[index].element.x2 = bubble[0].element.x;
    pointLines[index].element.y = chart.scales.y.getPixelForValue(line.data[num.x]);
    pointLabels[index].element.options.content = '';
  };

  const handleElementDragging = function (event: any, bubble:any): any {
    const moveX2 = event.x - lastMovement.x;
    const moveX = moveX2
    const moveY = event.y - lastMovement.y;
    drag(event, moveX, moveY, bubble);
    lastMovement = event;
    lastX = event.x
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
          setminY(chart.scales.y.min);
          setmaxY(chart.scales.y.max);

          let childata;

          if (lastX < 0) break;

          if (lastX <= chart.chartArea.left + chart.chartArea.width/8)
          {
            childata = moveAllPoints(event, 'left', chart);
          }
          else if (lastX >= chart.chartArea.width + chart.chartArea.left - chart.chartArea.width/8)
          {
            childata = moveAllPoints(event, 'right', chart);
          }
          else
          {
            childata = moveOnePoint(chart);
          }
          lastData = childata;
          lastX = -1

          handleParent(childata);

          break;
        case "mousedown" || "touchstart":
          lastEvent = event;
          lastMovement = event;
          bubble = getBubble(event, chart);
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
        annotations: [
          {

            type: 'label',
            id: 'referenceLabel',
            drawTime:'afterDatasetsDraw',
            display: true,
            content: 'Posición',
            rotation: 0,
            scaleID: 'x',
            backgroundColor: 'rgb(249, 246, 238)',
            borderColor:'black',
            borderWidth:2,
            borderRadius:5,
            font: {
              size: 18
            },
            xValue: function (context:any) {
              if (chart)
                return(chart.scales.x.getValueForPixel(chart.chartArea.left + chart.chartArea.width/16))
              return(0);
            },
            yValue: function (context:any) {
              if (chart)
                return(chart.scales.y.getValueForPixel(chart.chartArea.top + chart.height*0.1))
              return(0);
            },
            beforeDraw: function (context:any) {
              refLabel = context;
            },
            position: 'bottom',
            z:1,
          },

          {
            type: 'box',
            xMin: function (context:any) {
              if (chart)
                return(chart.scales.x.getValueForPixel(chart.chartArea.left))
              return(0);
            },
            xMax: function (context:any) {
              if (chart)
                return(chart.scales.x.getValueForPixel(chart.chartArea.left + chart.chartArea.width/8))
              return(0);
            },
            yMin: function (context:any) {
              if (chart)
                return(chart.scales.y.getValueForPixel(0))
              return(0);
            },
            yMax: function (context:any) {
              if (chart)
                return(chart.scales.y.getValueForPixel(chart.height))
              return(0);
            },
            backgroundColor: 'rgba(243, 167, 144, 0.15)',
            borderColor:'rgba(243, 167, 144, 0.58)',
            beforeDraw: function (context:any) {
              leftBorderArea = context;
            },
          },

          {
            type: 'box',
            xMin: function (context:any) {
              if (chart)
                return(chart.scales.x.getValueForPixel(chart.chartArea.width + chart.chartArea.left - chart.chartArea.width/8))
              return(0);
            },
            xMax: function (context:any) {
              if (chart)
                return(chart.scales.x.getValueForPixel(chart.chartArea.right))
              return(0);
            },
            yMin: function (context:any) {
              if (chart)
                return(chart.scales.y.getValueForPixel(0))
              return(0);
            },
            yMax: function (context:any) {
              if (chart)
                return(chart.scales.y.getValueForPixel(chart.height))
              return(0);
            },
            backgroundColor: 'rgba(243, 167, 144, 0.15)',
            borderColor:'rgba(243, 167, 144, 0.58)',
            beforeDraw: function (context:any) {
              rightBorderArea = context;
            },
          },

          {
            type: 'line',
            id: 'lineP',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: pStartPoint[0].x,
            xMax: pStartPoint[0].x,
            yMax: pStartPoint[0].y,
            yMin: pStartPoint[0].y-pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[0] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: pStartPoint[0].x,
            yValue: pStartPoint[0].y,
            font: {
              size: pointRadious,
            },
            content: 'P',
            fontColor: '#fff',
            textStrokeColor: 'rgb(237, 28, 36)',
            textStrokeWidth: 3,
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[0] = context;
            },
          },

          {
            type: 'line',
            id: 'lineQ',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: qrsStartPoint[0].x,
            xMax: qrsStartPoint[0].x,
            yMax: qrsStartPoint[0].y,
            yMin: qrsStartPoint[0].y + pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[1] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: qrsStartPoint[0].x,
            yValue: qrsStartPoint[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'rgb(255, 127, 39)',
            textStrokeWidth: 3,
            content: 'Q',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[1] = context;
            },
          },
          {
            type: 'line',
            id: 'lineR',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: rPoint[0].x,
            xMax: rPoint[0].x,
            yMax: rPoint[0].y,
            yMin: rPoint[0].y-pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[2] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: rPoint[0].x,
            yValue: rPoint[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'rgb(0, 162, 232)',
            textStrokeWidth: 3,
            content: 'R',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[2] = context;
            },
          },
          {
            type: 'line',
            id: 'lineS',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: qrsEndPoint[0].x,
            xMax: qrsEndPoint[0].x,
            yMax: qrsEndPoint[0].y,
            yMin: qrsEndPoint[0].y + pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[3] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: qrsEndPoint[0].x,
            yValue: qrsEndPoint[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'rgb(63, 72, 204)',
            textStrokeWidth: 3,
            content: 'S',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[3] = context;
            },
          },
          {
            type: 'line',
            id: 'lineS',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: tStartPoint[0].x,
            xMax: tStartPoint[0].x,
            yMax: tStartPoint[0].y,
            yMin: tStartPoint[0].y-pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[4] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: tStartPoint[0].x,
            yValue: tStartPoint[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'rgb(255, 174, 201)',
            textStrokeWidth: 3,
            content: 'ST',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[4] = context;
            },
          },
          {
            type: 'line',
            id: 'lineT',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: tEndPoint[0].x,
            xMax: tEndPoint[0].x,
            yMax: tEndPoint[0].y,
            yMin: tEndPoint[0].y-pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[5] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: tEndPoint[0].x,
            yValue: tEndPoint[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'rgb(163, 73, 164)',
            textStrokeWidth: 3,
            content: 'T',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[5] = context;
            },
          },
          {
            type: 'line',
            id: 'lineR',
            borderColor: 'black',
            borderWidth: 1,
            display:true,
            drawTime:'beforeDatasetsDraw',
            xMin: r2Point[0].x,
            xMax: r2Point[0].x,
            yMax: r2Point[0].y,
            yMin: r2Point[0].y-pointLineLength,
            beforeDraw: function (context:any) {
              pointLines[6] = context;
            },
            z:1,
          },
          {
            type: 'label',
            xValue: r2Point[0].x,
            yValue: r2Point[0].y,
            font: {
              size: pointRadious,
            },
            textStrokeColor: 'green',
            textStrokeWidth: 3,
            content: 'R2',
            fontColor: '#fff',
            padding: {
              left: 5,
              right: 5,
              top: 2,
              bottom: 2,
            },
            beforeDraw: function (context:any) {
              pointLabels[6] = context;
            },
            z:7,
          },
    ] as any,
        animation:true,
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
        ticks: {
          stepSize: 500,
          maxTicksLimit: 10,
          callback: function (value:any, index:any, values:any) {
            if (Math.floor(value) === value) {
              return value;
            }
            return value.toFixed(0);
          }
        }
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
        max: maxX,
        ticks: {
          maxTicksLimit: n_x_ticks,
          stepSize: 200,
          callback: function (value:any, index:any, values:any) {
            if (Math.floor(value) === value) {
              return value;
            }
            return value.toFixed(0);
          }
        }
      },
    },

  } as any;

const data1 = {
  labels: timeseriesLabels,
  datasets: [
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "P",
      altLabel:"pStart",
      data: pStartPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(237, 28, 36)",
      dragData: true,
      z:1,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "Q",
      altLabel:"qrsStart",
      data: qrsStartPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(255, 127, 39)",
      dragData: true,
      z:2,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "R",
      altLabel:"r",
      data: rPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(0, 162, 232)",
      dragData: true,
      z:3,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "S",
      altLabel:"qrsEnd",
      data: qrsEndPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(63, 72, 204)",
      dragData: true,
      z:4,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "ST",
      altLabel:"tEnd",
      data: tStartPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(255, 174, 201)",
      dragData: true,
      z:5,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "T",
      altLabel:"tStart",
      data: tEndPoint,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "rgb(163, 73, 164)",
      dragData: true,
      z:6,
    },
    {
      type: "bubble" as const,
      pointStyle:'rectRounded',
      pointRadius: pointRadious,
      label: "R2",
      altLabel:"r2",
      data: r2Point,
      spanGaps: true,
      borderColor: "black",
      backgroundColor: "green",
      dragData: true,
      dragX: true,
      z:7,
    },
    {

      type: "line" as const,
      label: "ECG",
      data: timeseriesData,
      backgroundColor: "black",
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
