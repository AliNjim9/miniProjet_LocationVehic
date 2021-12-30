import React,{useState,useEffect} from "react";
import {Button,Typography,Paper,Container} from "@material-ui/core";
import { useDispatch,useSelector}  from "react-redux";
import {getReservations,deleteReservation,updateReservation} from "../../actions/reservation";
import { DataGrid} from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';

export const Reservation =()=>{
  const user = JSON.parse(localStorage.getItem('profile'));
  
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 190 ,editable:false,autoIncrement: true,hide: true},
      { field: 'client', headerName: 'Client', width: 200 ,editable:false},
      { field: 'datearrive', headerName: 'Date Arrive', width: 200 ,editable:true},
      { field: 'etatres', headerName: 'Etat reservation', width: 150 ,editable:true},
      { field: 'destination', headerName: 'Destination',width: 150,editable:true},
      { field: 'commentaire', headerName: 'Commentaire', width: 150 ,editable:true},
      { field: 'nbrvoyageur', headerName: 'Nombre Voyageur', type: 'number',width: 180,editable:true}, 
    ];
    
    const [reservationData,setReservationData]=useState({
                      datearrive: '',etatres : 'en attenete', destination: '', 
                      commentaire: '', nbrvoyageur: '',client : user.result._id,});
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [message,setMessage]=useState("");
    const [data,setData]=useState([]);

    useEffect(() => {
      dispatch(getReservations());
    },  [tableData,dispatch]);
    const reservations = useSelector((state)=>state.reservation);
    
    const onDelete=() => {
     
      dispatch(deleteReservation(selectionModel,setMessage));
      setTable([]);
      reservations.map((reservation)=>{
        setTable(reservation['Reservations']);
      },[setTable,tableData]);
    }
    const onSave=()=>{
      dispatch(updateReservation(selectionModel,reservationData,setMessage));
      dispatch(getReservations());
    }

    const onClick=()=>{
      
      setData([]);
      dispatch(getReservations());
      const res=reservations[0]['Reservations'];
      const nomclient=reservations[0]['nomclient'];
      for (let i=0; i<res.length; i++){
        data.push({
          id:res[i]['id'], 
          client:nomclient[i],
          datearrive:res[i]['datearrive'],
          etatres:res[i]['etatres'],
          destination:res[i]['destination'],
          commentaire:res[i]['commentaire'],
          nbrvoyageur:res[i]['nbrvoyageur'],
        });
      }
      setTable(data);
    }
    const [selectionModel, setSelectionModel] = useState([]);
    const [editRowsModel, setEditRowsModel] = React.useState();

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    if(model){
      const editedIds = Object.keys(model);
      if(editedIds.length > 0){
        let values = Object.values(model[editedIds[0]]);
        setReservationData({...reservationData, 
          datearrive: values[0].value,
          etatres : values[1].value,
          destination: values[2].value,
          commentaire: values[3].value,
          nbrvoyageur: values[4].value,
          })
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
                    Reservations
                </Typography>
                <Button onClick={onClick}>Get Reservations</Button>
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
