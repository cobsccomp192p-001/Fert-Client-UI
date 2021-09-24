import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./dashboard.css";

import { Bar,Line  } from 'react-chartjs-2';

class Dashboard extends Component {
  state = {
    count: Number,
    Data: {},
  };
  render() {
    const { data: chartData } = this.state;
    return (
      <div className="container mt-5">
        <div className="row ">
          <Link
            className="col-sm-6 "
            to="/batches"
            style={{ textDecoration: "none" }}
          >
            <div className="card text-center text-white bg-success mt-5">
              <div className="card-body" id="link">
                <h5 className="card-title">Batches</h5>
                <p className="card-text">
                  Manage Batches and Feedstock
                </p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </Link>
          <Link
            className="col-sm-6"
            to="/windrows"
            style={{ textDecoration: "none" }}
          >
            <div className="card text-center text-white bg-primary mt-5">
              <div className="card-body" id="link">
                <h5 className="card-title">Windrows</h5>
                <p className="card-text">
                  Manage, Monitor, Interact with Windrows
                </p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </Link>

          <Link
            className="col-sm-6"
            to="/users"
            style={{ textDecoration: "none" }}
          >
            <div className="card text-center text-white bg-secondary mt-5">
              <div className="card-body" id="link">
                <h5 className="card-title">Sensor Network</h5>
                <p className="card-text">
                  Manage the probes of windrows
                </p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </Link>

          <Link
            className="col-sm-6"
            to="/orders"
            style={{ textDecoration: "none" }}
          >
            <div className="card text-center text-white bg-dark mt-5">
              <div className="card-body" id="link">
                <h5 className="card-title">Reporting and Certifications</h5>
                <p className="card-text">Generate reports, certifications</p>
                {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
              </div>
            </div>
          </Link>
        </div>
        <div className="container mt-5">
          <h1 className="display-4"><center>Statistics</center></h1><br></br>
          <h1 className="display-5">Sales</h1><br></br>
          <div>
            <Line data={this.state.Data} options={{maintainAspectRatio:false}}></Line>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div>
            <Bar data={this.state.Data} options={{maintainAspectRatio:false}}></Bar>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const { data } = await axios.get(
      "http://localhost:5000/api/order/getNewOrderCount"
    );
    let orderCount = data;
    this.setState({ count: orderCount });

    await axios.get("http://localhost:5000/api/order/getOrderStat")
    .then(res=>{
      console.log(res.data);
      const sales=res.data;
      let date=[];
      let totalSales=[];
      sales.forEach(record => {
        date.push(record._id.date);
        totalSales.push(record.TotalAmount);
      });
      this.setState({
        Data:{
          labels:date,
          datasets:[
            {
              label:'Revenue',
              data:totalSales,
              backgroundColor:[
                "#0DC7D2"
              ],
              borderColor:["#000"]
            }
          ]
        }
      });
    })
  }
}

export default Dashboard;
