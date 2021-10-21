import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "./circularProgress";
import Temperaturechart from "./temperaturechart";
import OtherSensorChart from "./otherSensorChart";
import WindrowStatus from "./windrowStatus";

function moreDetails(props) {
  return (
    <div>
      <h3
        style={{ marginTop: "30px", marginLeft: "50px", marginBottom: "50px" }}
      >
        Batch No: {props.location.state.BNO} | Windrow:{" "}
        {props.location.state.WNO} | Probe No: {props.location.state.probeNo}
      </h3>
      <div className="container" style={{ marginBottom: "50px" }}>
        <div className="row">
          <div className="col-7" style={{ paddingRight: "60px" }}>
            <WindrowStatus status={props.location.state.status} turn={props.location.state.turn}/>
          </div>
          <div className="col-5">
            <CircularProgress id={props.location.state.probeNo} />
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ marginBottom: "50px" }}>
        <div className="row">
          <div className="col">
            <Temperaturechart id={props.location.state.probeNo} />
          </div>
          <div className="col">
            <OtherSensorChart id={props.location.state.probeNo} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default moreDetails;
