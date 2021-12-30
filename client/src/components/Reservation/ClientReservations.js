import React,{useState,useEffect} from "react";
import {Button,Typography,Paper,Container} from "@material-ui/core";
import { useDispatch,useSelector}  from "react-redux";
import {getReservationsClient} from "../../actions/reservation";
import { DataGrid} from '@mui/x-data-grid';
export const ClientReservation =()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 190 ,editable:false,autoIncrement: true,hide: true},
        { field: 'datearrive', headerName: 'Date Arrive', width: 200 ,editable:false},
        { field: 'etatres', headerName: 'Etat reservation', width: 150 ,editable:false},
        { field: 'destination', headerName: 'Destination',width: 150,editable:false},
        { field: 'marquev', headerName: 'Marque vehicule', type: 'number',width: 80,editable:false}, 
        { field: 'typev', headerName: 'Nom Vehicule', type: 'number',width: 80,editable:false}, 
        { field: 'commentaire', headerName: 'Commentaire', width: 250 ,editable:false},
        { field: 'nbrvoyageur', headerName: 'Nombre Voyageur', type: 'number',width: 80,editable:false}, 
        { field: 'tarif', headerName: 'Tarif', type: 'number',width: 80,editable:false}, 
      ];
    
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [data,setData]=useState([]);

    const [message,setMessage]=useState("");

    const reservations=useSelector((state)=>state.reservation);
    useEffect(() => {
      if(user){
        if(user.result.nomclient)
          dispatch(getReservationsClient(user.result._id.toString()));    
      }
    },  [setTable,dispatch]);
    const onClick=() =>{
      setData([]);
      dispatch(getReservationsClient(user.result._id.toString()));
      const res=reservations[0]['Reservations'];
      const types=reservations[0]['Types'];
      const marques=reservations[0]['Marques'];
      const tarifs=reservations[0]['Tarifs'];
      for (let i=0; i<res.length; i++){
        data.push({
          id:res[i]['id'], 
          datearrive:res[i]['datearrive'],
          etatres:res[i]['etatres'],
          typev:types[i],
          marquev:marques[i],
          tarif:tarifs[i]['$numberDecimal'],
          destination:res[i]['destination'],
          commentaire:res[i]['commentaire'],
          nbrvoyageur:res[i]['nbrvoyageur'],
        });
      }
      setTable(data);
  }
  return (
    <Container maxWidth="lg">
      {user ? (user.result.nomclient ? (
    <Paper>
        <Typography variant="h6">
            Reservations
        </Typography>
        
        <Typography color="primary">{message}</Typography>
        <Button onClick={onClick} >Get Reservations</Button>
        <div style={{ height: 400, width: '100%' }}>
          
        <DataGrid
            rows={tableData}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}    
        />
        </div>
    </Paper>
     ):(
     <>
      <Typography variant="h6">
        You are not allowed here , Please Sign in ! 
      </Typography>
      </>
      )
      ):(
      <>
      <Typography variant="h6">
        You are not allowed here , Please Sign in ! 
      </Typography>
      </>)}   

</Container>
  )};