import React,{useState,useEffect} from "react";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { Container, Typography,Grow, Grid , Button } from '@material-ui/core';


export const HomeAdmin =()=>{
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isAdminInterne,setAdminInterne] = useState(false);
    const location = useLocation();
    useEffect(()=>{
      if(user){
      if(user.result.typeadmin==="Interne"){
        setAdminInterne(true);
      }
      if(user.result.typeadmin==='Externe')
          setAdminInterne(false);
      }
    },[location]);
    
    return(
      <Container maxWidth="lg">
        {user ?(<>
          {user.result.nomclient ?(<>
            <Typography variant="h6">
              You are not allowed to be here ! 
            </Typography>
            </>):(<>
            <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                  <Grid >
                    <Button  component={Link} to="/admin/reservations">Gerer Reservations  </Button>
                    
                  </Grid>
                  
                  {isAdminInterne ? (
                      <>
                        <Grid >
                            <Button component={Link} to="/admin/clients" >Gerer Clients </Button>
                        </Grid>  
                        <Grid >
                            <Button component={Link} to="/admin/vehicules" >Gerer Vehicules </Button>
                        </Grid>  
                        <Grid >
                            <Button component={Link} to="/admin/adminexterne" >Gerer Administrateurs externes </Button>
                        </Grid>
                        </>

                    ) :(
                    <div></div>
                    )}
                    
              </Grid>
              <Grid item xs={12} sm={4}>
                  
              </Grid>
            </Grid>
          </Container>
        </Grow>
        </>)}
        </>):(
          <>
          <Typography variant="h6">
            You are not allowed here , Please Sign in ! 
          </Typography>
          </>)}
      </Container>
  )
};
