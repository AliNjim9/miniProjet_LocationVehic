import React,{useState,useEffect} from "react";
import {Button,Typography,Paper,Container} from "@material-ui/core";
import { useDispatch,useSelector}  from "react-redux";
import {getClients,deleteClient,updateClient} from "../../actions/client";
import { DataGrid} from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';

export const Clients =()=>{
  const user = JSON.parse(localStorage.getItem('profile'));
  
  
    const columns = [
      { field: 'id', headerName: 'ID', width: 190 ,editable:false,autoIncrement: true,hide: true},
      { field: 'login', headerName: 'Login', width: 150 ,editable:true},
      { field: 'nomclient', headerName: 'Nom ', width: 200 ,editable:false},
      { field: 'adresseclient', headerName: 'Adresse ', width: 200 ,editable:true},
      { field: 'telclient', headerName: 'Telephone ', width: 150 ,editable:true},
      { field: 'mailclient', headerName: 'Mail',width: 150,editable:true},
      { field: 'newpwd', headerName: 'New Password', width: 150 ,editable:true},
    ];
    
    const [clientData,setClientData]=useState({
        id:'',
        login:'',
        nomclient:'',
        adresseclient:'',
        telclient:'',
        mailclient:'',
        newpwd:''
    });
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [message,setMessage]=useState("");
    const [data,setData]=useState([]);
    const clients = useSelector((state)=>state.client);
    useEffect(() => {
      dispatch(getClients());
      
    },  [tableData,dispatch]);
    
    
    const onDelete=() => {
     
      /*dispatch(deleteReservation(selectionModel,setMessage));
      setTable([]);
      clients.map((client)=>{
        setTable(client['Reservations']);
      },[setTable,tableData]);*/
    }
    const onSave=()=>{
      //dispatch(updateReservation(selectionModel,reservationData,setMessage));
      //dispatch(getReservations());
    }

    const onClick=()=>{
        if(clients.length>0)
        console.log(clients);
      setData([]);
      //dispatch(getReservations());
      const client=clients[0]['Clients'];
      const login=clients[0]['Logins'];
      for (let i=0; i<client.length; i++){
        data.push({
            id:client[i]['id'],
            login:login[i],
            nomclient:client[i]['nomclient'],
            adresseclient:client[i]['adresseclient'],
            telclient:client[i]['telclient'],
            mailclient:client[i]['mailclient']
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
        setClientData({...clientData,
          login: values[0].value,
          nomclient : values[1].value,
          adresseclient: values[2].value,
          telclient: values[3].value,
          mailclient: values[4].value,
          newpwd: values[5].value,
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
                <Button onClick={onClick}>Get Clients</Button>
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
