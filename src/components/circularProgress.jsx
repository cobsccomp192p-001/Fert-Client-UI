import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

const api = axios.create({
  baseURL: `http://localhost:5000/probe`,
});

function CircularProgress(props) {
  const probeNo=props.id

  const [data, setData] = useState([]);
  useEffect(() => {
    api
      .get("/"+probeNo)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);


  return (
    <div className="container">
      <div className="row" style={{ marginBottom: "50px" }}>
        <div className="col">
          <ProgressProvider valueStart={0} valueEnd={data.temperature}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}°C`}
                strokeWidth={5}
              />
            )}
          </ProgressProvider>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Temperature</p>
        </div>
        <div className="col">
          <ProgressProvider valueStart={0} valueEnd={data.humidity}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={5}
              />
            )}
          </ProgressProvider>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Humidity</p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ProgressProvider valueStart={0} valueEnd={data.moisture}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={5}
              />
            )}
          </ProgressProvider>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Moisture</p>
        </div>
        <div className="col">
          <ProgressProvider valueStart={0} valueEnd={data.methane}>
            {(value) => (
              <CircularProgressbar
                value={value}
                text={`${value}%`}
                strokeWidth={5}
              />
            )}
          </ProgressProvider>
          <p style={{ textAlign: "center", marginTop: "10px" }}>Methane</p>
        </div>
      </div>
    </div>
  );
}

export default CircularProgress;
