import React, { useState, useEffect } from "react";
import { forwardRef } from "react";
import Avatar from "react-avatar";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

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
import moreDetails from "@material-ui/icons/Details";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

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
  baseURL: `http://localhost:5000/windrow`,
});

const feedstock = axios.create({
  baseURL: `http://localhost:5000/feedstock`,
});

const batches = axios.create({
  baseURL: `http://localhost:5000/batch`,
});

function App() {
  const [fdata, fsetData] = useState([]); //feedback data 
  const [batchdata, batchsetData] = useState([]); //batch data 

  var columns = [
    { title: "id", field: "_id", hidden: true },

    {
      title: "WNO",
      field: "WNO",
      editable: "never",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "BNO",
      field: "BNO",
      editable: "onAdd",
      defaultGroupOrder: 0,
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: batchdata,
    },
    {
      title: "FLevel1",
      field: "FLevel1",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: fdata,
    },
    {
      title: "FLevel2",
      field: "FLevel2",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: fdata,
    },
    {
      title: "FLevel3",
      field: "FLevel3",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: fdata,
    },
    {
      title: "FLevel4",
      field: "FLevel4",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: fdata,
    },
    {
      title: "FLevel5",
      field: "FLevel5",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup: fdata,
    },
    {
      title: "Start_Date",
      field: "Start_Date",
      editable: "never",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
    },
    {
      title: "Status",
      field: "status",
      initialEditValue:1,
      editable: "never",
      headerStyle: {
        backgroundColor: "#00994d",
        color: "#FFF",
      },
      lookup:{1:'Fresh',2:'Mesophilic',3:'Thermophilic',4:'Maturation',5:'Stable'},
      cellStyle: (e, rowData) => {
        if (rowData.status===1) {
          return { backgroundColor: "#B2EC12" };
        }
        if(rowData.status===2){
          return { backgroundColor: "#F78806" };
        }
        if(rowData.status===3){
          return { backgroundColor: "#FF4E2F" };
        }
        if(rowData.status===4){
          return { backgroundColor: "#8B4C10" };
        }
        if(rowData.status===5){
          return { backgroundColor: "#000",color:"#fff" };
        }
      },
    },
  ];
  const [data, setData] = useState([]); //table data
  const history = useHistory();
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

    feedstock
      .get("/getall")
      .then((res) => {
        var mappingData = {};
        res.data.forEach((k) => {
          mappingData[k._id] = k.Name;
        });
        console.log(mappingData);
        fsetData(mappingData);
      })
      .catch((error) => {
        console.log("Error");
      });

    batches
      .get("/getall")
      .then((res) => {
        var mappingData = {};
        res.data.forEach((k) => {
          mappingData[k.BNO] = k.BNO;
        });
        console.log(mappingData);
        batchsetData(mappingData);
      })
      .catch((error) => {
        console.log("Error");
      });
  }, []);

  const AddRow = (newData, resolve) => {
    //validation
    let errorList = [];

    if (newData.BNO === undefined) {
      errorList.push("Please enter BNO");
    }

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

  const UpdateRow = (newData, oldData, resolve) => {
    //validation
    let errorList = [];

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
    <div className="container mt-5">
      <div className="App">
        <Grid container spacing={50}>
          <Grid item xs={12}>
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
              title="Windrow Management"
              columns={columns}
              data={data}
              actions={[
                {
                  icon: moreDetails,
                  tooltip: "More",
                  onClick: (event, rowData) =>
                    history.push({
                      pathname: "windrowDetails/" + rowData._id,
                      state: rowData,
                    }),
                },
              ]}
              options={{
                grouping: true,
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
            />
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;
