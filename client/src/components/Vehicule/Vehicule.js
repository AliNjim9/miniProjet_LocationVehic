import React,{useState,useEffect} from "react";
import {Button,Typography,Paper,Container} from "@material-ui/core";
import { useDispatch,useSelector}  from "react-redux";
import {getVehicules,deleteVehicule,updateVehicule} from "../../actions/vehicule";
import { DataGrid} from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';

export const Vehicule =()=>{
    const columns = [

        { field: 'id', headerName: 'ID', width: 190 ,editable:false,autoIncrement: true,hide: true},
        { field: '_id', headerName: 'Id Vehicule', width: 130 ,editable:false ,hide: true},
        { field: 'marquev', headerName: 'Marque ', width: 200 ,editable:true},
        { field: 'puissancev', headerName: 'Puissance', width: 150 ,editable:true},
        { field: 'nbplace', headerName: 'Nombre Place',type:'number',width: 150,editable:true},
        { field: 'localite', headerName: 'Localite', width: 250 ,editable:true},
        { field: 'typev', headerName: 'Type Vehicule', width: 80,editable:true}, 
      ];
    const user = JSON.parse(localStorage.getItem('profile'));
    const [vehiculeData,setVehiculeData]=useState({
                      datearrive: '',etatres : 'en attenete', destination: '', 
                      commentaire: '', nbrvoyageur: '',client : user.result._id,});
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [message,setMessage]=useState("");

    useEffect(() => {
      dispatch(getVehicules());
    },  [tableData,dispatch]);
    const vehicules = useSelector((state)=>state.vehicule);
    
    const onDelete=() => {
     
      dispatch(deleteVehicule(selectionModel,setMessage));
      setTable([]);
      vehicules.map((vehicule)=>{
        setTable(vehicule['Vehicules']);
      },[setTable]);
    }
    const onSave=()=>{
      dispatch(updateVehicule(selectionModel,vehiculeData,setMessage));
     
    }
    const onClick=()=>{
      setTable([]);
      vehicules.map((vehicule)=>{
        console.log(vehicule);
        console.log(vehicule['Vehicules']);
        setTable(vehicule['Vehicules']);
        //console.log();
      },[setTable]);
    }
    const [selectionModel, setSelectionModel] = useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState();

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    if(model){
      const editedIds = Object.keys(model);
      if(editedIds.length > 0){
        let values = Object.values(model[editedIds[0]]);
        setVehiculeData({...vehiculeData,
            datearrive: values[0].value,
            etatres : values[1].value,
            destination: values[2].value,
            commentaire: values[3].value,
            nbrvoyageur: values[4].value,
            });
      }
    }
  },[selectionModel,dispatch]);

  
  const onRefresh=()=>{
    window.location.reload(false);

  }
  
    return(
      <Container maxWidth="lg">
        
            
            <Paper>
                <Typography variant="h6">
                    Vehicles
                </Typography>
                <Button onClick={onClick}>Get Vehicules</Button>
                <Button onClick={onSave}>Save</Button>
                <Button onClick={onDelete}>Delete</Button>
                <Button onClick={onRefresh}>Refresh</Button>
                <Typography color="primary">{message}</Typography>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={tableData}
                    
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    
                    editRowsModel={editRowsModel}
                    editMode="row"
                    onEditRowsModelChange={handleEditRowsModelChange}
                    onSelectionModelChange={(newSelectionModel) => {
                      setSelectionModel(newSelectionModel);
                    }}
                    selectionModel={selectionModel}   
                />
                
                </div>
                </Paper>
                <Paper>
                  {selectionModel}
                <Alert severity="info" style={{ marginTop: 8 }}>
                <code>editRowsModel: {JSON.stringify(editRowsModel)}</code>
                </Alert>
                
                </Paper>
                
        
        </Container>
     
  )
};
