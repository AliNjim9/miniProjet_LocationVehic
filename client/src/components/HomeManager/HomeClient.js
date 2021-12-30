import React,{useState,useEffect} from "react";
import { Link,useLocation} from "react-router-dom";
import { Container,Typography, Grow, Grid , Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';


export const HomeClient =()=>{
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));


    return(
      <Container maxWidth="lg">
          {user ?(<>
            {user.result.nomclient ?(<>
          <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                  <Grid >
                    <Button  component={Link} to="/home/client/reservations/">Mes Reservations </Button>
                  </Grid>  
                  <Grid >
                    <Button  component={Link} to="/home/client/reservations/new">Réserver de nouveau </Button>
                  </Grid>  
                  
              </Grid>
              <Grid item xs={12} sm={4}>
              </Grid>
            </Grid>
          </Container>
          </Grow>
          </>):(<>
          <Typography variant="h6">
            You are not allowed to be here ! 
          </Typography></>)}
          </>):(
          <>
          <Typography variant="h6">
            You are not allowed here , Please Sign in ! 
          </Typography>
          </>
          )}
        
      </Container>
  )
};
