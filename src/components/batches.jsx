import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import CustomDatePicker from "./CustomDatePicker";

import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const api = axios.create({
  baseURL: `http://localhost:5000/batch`,
});

function App(props) {
  var columns = [
    { title: "id", field: "_id", hidden: true },

    {
      title: "Batch code",
      field: "BNO",
      editable: "onAdd",
      filtering: false,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "Status",
      field: "status",
      searchable: false,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: {
        0: "Ongoing",
        1: "Completed",
      },

      // cellStyle: (e, rowData) => {
      //   if (rowData.status==0) {
      //     return { backgroundColor: "#BBEC12" };
      //   }
      //   else{
      //     return { backgroundColor: "#EC9312" };
      //   }
      // },
    },
    {
      title: "No of active windrows",
      field: "NoOfActiveWin",
      filtering: false,
      searchable: false,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "No of comp. windrows",
      field: "NoOfCompletedWin",
      filtering: false,
      searchable: false,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "Tot output",
      field: "output",
      filtering: false,
      searchable: false,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "Start date",
      field: "startDate",
      type: "date",
      dateSetting: { locale: "en-GB" },
      filterComponent: (props) => <CustomDatePicker {...props} />,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    api
      .get("/getall")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const UpdateRow = (newData, oldData, resolve) => {
    //validation
    let errorList = [];
    if (newData.status === "") {
      errorList.push("Please enter Status");
    }

    if (errorList.length < 1) {
      api
        .put("/" + newData._id, newData)
        .then((res) => {
          const dataUpdate = [...data];
          const index = oldData.tableData.id;
          dataUpdate[index] = newData;
          setData([...dataUpdate]);
          resolve();
          setIserror(false);
          setErrorMessages([]);
        })
        .catch((error) => {
          setErrorMessages(["Update failed! Server error"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const AddRow = (newData, resolve) => {
    //validation
    let errorList = [];

    if (errorList.length < 1) {
      //no error
      api
        .post("/add", newData)
        .then((res) => {
          let dataToAdd = [...data];
          dataToAdd.push(newData);
          setData(dataToAdd);
          resolve();
          setErrorMessages([]);
          setIserror(false);
          // console.log(newData);
          api
            .get("/getall")
            .then((res) => {
              setData(res.data);
            })
            .catch((error) => {
              console.log("Error");
            });
        })
        .catch((error) => {
          setErrorMessages(["Cannot add data. Server error!"]);
          setIserror(true);
          resolve();
        });
    } else {
      setErrorMessages(errorList);
      setIserror(true);
      resolve();
    }
  };

  const DeleteRow = (oldData, resolve) => {
    api
      .delete("/" + oldData._id)
      .then((res) => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve();
      })
      .catch((error) => {
        setErrorMessages(["Delete failed! Server error"]);
        setIserror(true);
        resolve();
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="App">
          <Grid container spacing={5}>
            <Grid item xs={11}>
              <div>
                {iserror && (
                  <Alert severity="error">
                    {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>;
                    })}
                  </Alert>
                )}
              </div>
              <MaterialTable
                title="Batch Summery Details"
                columns={columns}
                data={data}
                detailPanel={(rowData) => {
                  return (
                    <ul>
                      {rowData.items.map((Fdata, i) => {
                        return (
                          <div key={i}>
                            <div
                              class="btn-group btn-group-sm"
                              role="group"
                              aria-label="Feedstocks"
                            >
                              <button type="button" class="btn btn-secondary">
                                {Fdata.WNO}
                              </button>
                              {Fdata.status == 1 ? (
                                <button type="button" class="btn btn-success">
                                  Status- Fresh
                                </button>
                              ) : Fdata.status == 2 ? (
                                <button type="button" class="btn btn-warning">
                                  Status- Mesophilic
                                </button>
                              ) : Fdata.status == 3 ? (
                                <button type="button" class="btn btn-danger">
                                  Status- Thermophilic
                                </button>
                              ) : Fdata.status == 4 ? (
                                <button type="button" class="btn btn-secondary">
                                  Status- Maturation
                                </button>
                              ) : (
                                <button type="button" class="btn btn-dark">
                                  Status- Stable
                                </button>
                              )}
                            </div>
                            <p></p>
                          </div>
                        );
                      })}
                    </ul>
                  );
                }}
                icons={tableIcons}
                editable={{
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve) => {
                      UpdateRow(newData, oldData, resolve);
                    }),
                  onRowAdd: (newData) =>
                    new Promise((resolve) => {
                      AddRow(newData, resolve);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve) => {
                      DeleteRow(oldData, resolve);
                    }),
                }}
                options={{
                  filtering: true,
                  exportButton: true,
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Link to="/feedstock" style={{ textDecoration: "none" }}>
                <Fab
                  color="secondary"
                  aria-label="add"
                  variant="extended"
                  size="medium"
                >
                  <AddIcon />
                  Feedstock
                </Fab>
              </Link>
            </Grid>
          </Grid>
        </div>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  );
}

export default App;
