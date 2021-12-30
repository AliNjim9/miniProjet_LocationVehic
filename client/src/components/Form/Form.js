import React,{useState,useEffect,useRef,useMemo} from "react";
import {TextField,Button,Typography,Paper,Container, colors} from "@material-ui/core";
import { useDispatch,useSelector}  from "react-redux";
import {createReservation} from "../../actions/reservation";
import {getVehicules} from "../../actions/vehicule";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Input } from './Input.js';

import Alert from '@mui/material/Alert';

export const Form=()=>{
    const columns = [

        { field: 'id', headerName: 'ID', width: 190 ,editable:false,hide: true},
        { field: 'idloc', headerName: 'IDLoc', width: 190 ,editable:false,hide: true},
        { field: 'idtypev', headerName: 'IDTypev', width: 190 ,editable:false,hide: true},
        { field: 'marquev', headerName: 'Marque ', width: 200 ,editable:false},
        { field: 'puissancev', headerName: 'Puissance', width: 150 ,editable:false},
        { field: 'nbplace', headerName: 'Nombre Place',type:'number',width: 150,editable:false},
        { field: 'localite', headerName: 'Localite', width: 250 ,editable:false},
        { field: 'typev', headerName: 'Type Vehicule', width: 180,editable:false}, 
        { field: 'tarif', headerName: 'Tarif', width: 180,editable:false}, 
      ];
      
    const user = JSON.parse(localStorage.getItem('profile'));
    const vehicules=useSelector((state)=>state.vehicule);
    const [vehiculeData,setVehiculeData]=useState({});
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [data,setData]=useState([]);
    const [selectionModel, setSelectionModel] = useState([]);
    useEffect(() => {
        dispatch(getVehicules());
        if(vehicules.length>0){
            vehicules.map((vehicule)=>{
              setTable(vehicule['Vehicules']);
              
            },[setTable]);
        }
    },[dispatch]);
  
    const [reservationData,setReservationData]=useState({
                datearrive: '',etatres : 'en attenete', destination: '', 
                commentaire: '', nbrvoyageur: '',client :{...user && (user.result._id)},vehicule:''});
    const [message,setMessage]=useState("");
    const hundledSubmit= (e)=>{
        e.preventDefault();
        console.log(reservationData);
        if(selectionModel!=""){
          setReservationData({ ...reservationData, vehicule: selectionModel});
          console.log(reservationData);
          dispatch(createReservation(reservationData,setMessage));
        }else{
          setMessage("Select a car !");
        }
        
        
    }
    
    const onClick=()=>{
        dispatch(getVehicules());
      setData([]);
      const vehi=vehicules[0]['Vehicules'];
      const loc=vehicules[0]['nomLocalites'];
      const idloc=vehicules[0]['localites'];
      const idtypev=vehicules[0]['typevehicules'];
      const tarif=vehicules[0]['tarif'];
      const typev=vehicules[0]['typev'];
      
      for (let i=0; i<vehi.length; i++){
        data.push({
          id:vehi[i]['id'], 
          idloc:idloc[i],
          idtypev:idtypev[i],
          marquev:vehi[i]['marquev'],
          puissancev:vehi[i]['puissancev'],
          nbplace:vehi[i]['nbplace'],
          typev:typev[i],
          tarif:tarif[i]["$numberDecimal"],
          localite:loc[i]});
      }
      setTable(data);
      
    };

    const clear = () => {
        
        setReservationData({ datearrive: '',etatres : 'en attenete', destination: '', commentaire: '', nbrvoyageur: '',client : user.result._id,vehicule:''});
    };
    const onRefresh=()=>{
        window.location.reload(false);
      }
      
    
    
    return(
        <Container maxWidth="lg">
          {user ?(
            <form autoComplete="off" onSubmit={hundledSubmit}>
            <Paper>
                <Typography variant="h6">
                    Creating Reservation
                </Typography>
                <Button onClick={onClick}>Get Cars</Button>
                <Button onClick={onRefresh}>Refresh</Button>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    onSelectionModelChange={(newSelectionModel) => {
                      setSelectionModel(newSelectionModel);
                      if(newSelectionModel!=null){
                        for (let i=0; i<tableData.length; i++){
                            if(tableData[i]["id"]==newSelectionModel){
                              setVehiculeData({...vehiculeData,
                                id: newSelectionModel.toString(),
                                idloc: tableData[i]["idloc"],
                                idtypev: tableData[i]["idtypev"],
                                marquev:tableData[i]['marquev'],
                                puissancev:tableData[i]['puissancev'],
                                nbplace:tableData[i]['nbplace'],
                                typev:tableData[i]["typev"],
                                tarif:tableData[i]["tarif"],
                                localite:tableData[i]["localite"], 
                              },[newSelectionModel,setSelectionModel,vehiculeData]);
                            }
                          }       
                        }
                      }}
                    selectionModel={selectionModel}
                />
                </div>
                <Typography color="primary">{message}</Typography>
                <Typography color="primary"><code>Car: {JSON.stringify(vehiculeData.marquev)||""}</code></Typography>
               
                <Input name="datearrive" variant="outlined" label="Date" fullWidth type="Date" value={reservationData.datearrive} handleChange={(e)=>setReservationData({...reservationData,datearrive:e.target.value})}/>
                <Input name="destination" variant="outlined" label="Destination" fullWidth value={reservationData.destination} handleChange={(e)=>setReservationData({...reservationData,destination:e.target.value})}/>
                <Input  name="commentaire" variant="outlined" label="Commentaire" fullWidth value={reservationData.commentaire} handleChange={(e)=>setReservationData({...reservationData,commentaire:e.target.value})}/>
                <Input name="nbrvoyageur" variant="outlined" label="Nombre voyageur" fullWidth value={reservationData.nbrvoyageur} handleChange={(e)=>setReservationData({...reservationData,nbrvoyageur:e.target.value})}/>
                
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                </Paper>
                
            </form>
        ):(<>
          <Typography variant="h6">
            You are not allowed here , Please Sign in ! 
          </Typography>
          </>
          )}
        </Container>
    );
}