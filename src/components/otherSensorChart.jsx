import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const api = axios.create({
  baseURL: `http://localhost:5000/probe`,
});

function OtherSensorChart(props) {
  const probeNo = props.id;
  const [statData, setStatData] = useState([]);

  useEffect(() => {
    api
      .get("/stat/" + probeNo)
      .then((res) => {
        let dateArray = [];
        let moistureArray=[];
        let humidityArray=[];
        let methaneArray=[];
        const chartData = res.data;
        chartData.map((record) => {
          dateArray.push(record.recDate); //x
          moistureArray.push(record.moisture);
          humidityArray.push(record.humidity);
          methaneArray.push(record.methane);
        });
        setStatData((statData) => [...statData, dateArray,moistureArray,humidityArray,methaneArray]);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const otherSensordata = {
    labels: statData[0],
    datasets: [
      {
        label: "Moisture",
        data: statData[1],
        fill: false,
        borderColor: "#5FB1F7",
      },
      {
        label: "Humidity",
        data: statData[2],
        fill: false,
        borderColor: "#F4A23E",
      },
      {
        label: "Methane",
        data: statData[3],
        fill: false,
        borderColor: "#A1B208",
      },
    ],
  };
  return (
    <div style={{ width: "100%" }}>
      <h5 style={{ textAlign: "center" }}>Moisture, Humidity, Methane Statistics</h5>
      <br></br>
      <Line data={otherSensordata} />
      <br></br>
    </div>
  );
}

export default OtherSensorChart;
