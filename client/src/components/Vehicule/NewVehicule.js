import React,{useState,useEffect} from "react";
import {TextField,Button,Typography,Paper,Container} from "@material-ui/core";
import { useDispatch,useSelector,createSelector}  from "react-redux";
import {getVehicules,createVehicule,updateVehicule,deleteVehicule} from "../../actions/vehicule";
import {updateTypeVehicule} from "../../actions/typevehicule";
import {updateLocalite} from "../../actions/localite";
import { DataGrid} from '@mui/x-data-grid';

export const NewVehicule =()=>{
    const user = JSON.parse(localStorage.getItem('profile'));
    const[isInternAdmin,setInternAdmin]=useState(false);
    const [vehiculeData,setVehiculeData]=useState({});
    const vehicules = useSelector((state)=> state.vehicule);
    const dispatch=useDispatch();
    const [tableData,setTable]=useState([]);
    const [data,setData]=useState([]);
    const [message,setMessage]=useState("");
    const [selectionModel, setSelectionModel] = useState([]);
    const [editRowsModel, setEditRowsModel] = useState();
    useEffect(() => {
      dispatch(getVehicules()); 
      if(user){
      if(user.result.typeadmin=="Interne")
        setInternAdmin(true);
      if(user.result.typeadmin=="Externe")
        setInternAdmin(false);
      }
    }, [dispatch,setMessage] );
    
    const columns = [

        { field: 'id', headerName: 'ID', width: 190 ,editable:false,hide: true},
        { field: 'idloc', headerName: 'IDLoc', width: 190 ,editable:false,hide: true},
        { field: 'idtypev', headerName: 'IDTypev', width: 190 ,editable:false,hide: true},
        { field: 'marquev', headerName: 'Marque ', width: 200 ,editable:true},
        { field: 'puissancev', headerName: 'Puissance', width: 150 ,editable:true},
        { field: 'nbplace', headerName: 'Nombre Place',type:'number',width: 150,editable:true},
        { field: 'localite', headerName: 'Localite', width: 250 ,editable:true},
        { field: 'typev', headerName: 'Nom Vehicule', width: 80,editable:true}, 
        { field: 'tarif', headerName: 'Tarif', width: 80,editable:true}, 
      ];
      const cols = [

        { field: 'id', headerName: 'ID', width: 190 ,editable:false,hide: true},
        { field: 'idloc', headerName: 'IDLoc', width: 190 ,editable:false,hide: true},
        { field: 'idtypev', headerName: 'IDTypev', width: 190 ,editable:false,hide: true},
        { field: 'marquev', headerName: 'Marque ', width: 200 ,editable:false},
        { field: 'puissancev', headerName: 'Puissance', width: 150 ,editable:false},
        { field: 'nbplace', headerName: 'Nombre Place',type:'number',width: 150,editable:false},
        { field: 'localite', headerName: 'Localite', width: 250 ,editable:false},
        { field: 'typev', headerName: 'Type Vehicule', width: 80,editable:false}, 
        { field: 'tarif', headerName: 'Tarif', width: 80,editable:false}, 
      ];
    
    const onDelete=() => {
        dispatch(deleteVehicule(selectionModel,setMessage));
    }
    const onSave=()=>{
      console.log(vehiculeData);
      console.log('selectionModel : '+selectionModel);
      
        let typevdata={typev:vehiculeData.typev,tarif:vehiculeData.tarif};
        let locdata={localite:vehiculeData.localite};
        dispatch(updateTypeVehicule(vehiculeData.idtypev,typevdata,setMessage));
        dispatch(updateLocalite(vehiculeData.idloc,locdata,setMessage));
        dispatch(updateVehicule(selectionModel,vehiculeData,setMessage));
        dispatch(getVehicules());
      
    }
    const onClick=async ()=>{
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
      console.log(data);
      
  }
    

  const handleEditRowsModelChange = React.useCallback((model) => {
    setEditRowsModel(model);
    if(model){
      console.log("mydata"+tableData.length);
      
      const editedIds = Object.keys(model);
      
      if(editedIds.length > 0){
        let values = Object.values(model[editedIds[0]]);
        setVehiculeData({...vehiculeData,
            marquev: values[0].value,  
            puissancev : values[1].value,
            nbplace: values[2].value,
            localite: values[3].value,
            typev: values[4].value,
            tarif: values[5].value,
            });
      }      
    }console.log(vehiculeData);
  },[selectionModel,setSelectionModel,vehiculeData]);

  
  const onRefresh=()=>{
    window.location.reload(false);

  }
    const clear = () => {
        setVehiculeData({ marquev: '',puissancev : '', nbplace: '', 
        localite: '', typev: '',tarif : '' });
    };
  const hundledSubmit= (e)=>{
    e.preventDefault();
    dispatch(createVehicule(vehiculeData,setMessage));
    dispatch(getVehicules());
    clear();
}
    
    return(
      
        <Container maxWidth="lg">
        {user ?(
        <form autoComplete="off" noValidate onSubmit={hundledSubmit}>
        <Paper>
            <Typography variant="h6">
                Creating Vehicule
            </Typography>
            <Button onClick={onClick}>Get Vehicules</Button>
            {isInternAdmin && (
              <>
              <Button name="btnSave" onClick={onSave}>Save</Button>
              <Button name="btnDelete" onClick={onDelete}>Delete</Button>
            </>
            )}
            
            <Button onClick={onRefresh}>Refresh</Button>
            <Typography color="primary">{message}</Typography>
            <div style={{ height: 400, width: '100%' }}>
            {isInternAdmin ? (<DataGrid
                rows={tableData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                editRowsModel={editRowsModel}
                editMode="row"
                onEditRowsModelChange={handleEditRowsModelChange}
                onSelectionModelChange={(newSelectionModel) => {
                  setSelectionModel(newSelectionModel);
                  for (let i=0; i<tableData.length; i++){
                    if(tableData[i]["id"]==newSelectionModel){
                      setVehiculeData({...vehiculeData,
                        id: newSelectionModel.toString(),
                        idloc: tableData[i]["idloc"],
                        idtypev: tableData[i]["idtypev"], 
                      },[newSelectionModel,setSelectionModel,vehiculeData]);
                      console.log("added id , idloc , idtypev");
                    }
                  }
                }}
                selectionModel={selectionModel}
                
            />
            ) : (<DataGrid
              rows={tableData}
              columns={cols}
              pageSize={5}
              rowsPerPageOptions={[5]}
              editRowsModel={editRowsModel}
              />)};
            
            </div>
            {isInternAdmin && (
              <>
            <Typography color="primary">{message}</Typography>
            <TextField required name="marquev" variant="outlined" label="Marque "fullWidth value={vehiculeData.marquev|| ''} required onChange={(e)=>setVehiculeData({...vehiculeData,marquev:e.target.value})} />
            <TextField required name="puissancev" variant="outlined" label="Puissance" fullWidth value={vehiculeData.puissancev|| ''} onChange={(e)=>setVehiculeData({...vehiculeData,puissancev:e.target.value})} />
            
            <TextField required name="nbplace" variant="outlined" type='Number' label="Nombre place" fullWidth value={vehiculeData.nbplace|| ''} onChange={(e)=>setVehiculeData({...vehiculeData,nbplace:e.target.value})} />
            <TextField required name="localite" variant="outlined" label="Localite" fullWidth value={vehiculeData.localite|| ''} onChange={(e)=>setVehiculeData({...vehiculeData,localite:e.target.value})} />
            <TextField required name="typev" variant="outlined" label="Type Vehicule" fullWidth value={vehiculeData.typev|| ''} onChange={(e)=>setVehiculeData({...vehiculeData,typev:e.target.value})} />
            <TextField required name="tarif" variant="outlined" label="Tarif" fullWidth value={vehiculeData.tarif|| ''} onChange={(e)=>setVehiculeData({...vehiculeData,tarif:e.target.value})} />

            <Button variant="contained" color="primary" size="large" type="submit"  fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </>
            )}
            </Paper>
            
        </form>
        ):(
        <>
        <Typography variant="h6">
          You are not allowed here , Please Sign in ! 
        </Typography>
        </>
        )}
    </Container>
     
  )
};
