import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const api = axios.create({
  baseURL: `http://localhost:5000/probe`,
});

function Temperaturechart(props) {
  const probeNo = props.id;
  const [statData, setStatData] = useState([]);

  useEffect(() => {
    api
      .get("/stat/" + probeNo)
      .then((res) => {
        let dateArray = [];
        let tempArray = [];
        const chartData = res.data;
        chartData.map((record) => {
          dateArray.push(record.recDate); //x
          tempArray.push(record.temperature);
        });
        setStatData((statData) => [...statData, dateArray,tempArray]);

      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const tempChartData = {
    labels: statData[0],
    datasets: [
      {
        label: "Temperature",
        data: statData[1],
        fill: true,
        backgroundColor: "rgba(245, 183, 177,0.2)",
        borderColor: "#F9480B",
      },
    ],
  };

  return (
    <div style={{ width: "100%" }}>
      <h5 style={{ textAlign: "center" }}>Temperature Statistics</h5>
      <br></br>
      <Line data={tempChartData} />
      <br></br>
    </div>
  );
}

export default Temperaturechart;
