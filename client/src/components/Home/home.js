import React,{useEffect,useState} from "react";
import { Link,useNavigate,useLocation} from "react-router-dom";
import { Container, Grow, Grid , Button } from '@material-ui/core';


export const Home =()=>{
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
    const navigation = useNavigate();

    useEffect(()=>{
      if(user!=null){
        if(user.result.typeadmin)
        navigation('/home/admin');
        if(!user.result.typeadmin)
        navigation('/home/client');
      }
      },[location]);

    return(
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={7}>
                
                   
                  
                  <div >
                  <h3 className="">Welcome Travelers!</h3>
                  <h5 className="">Vehicle rental agency is a platform in which you can rent any car online!</h5>
                  <img src="main.png"  alt="img1"/>
                  <br></br>
                  <br></br>
                  <Button component={Link} to="/auth" variant="contained">Rent your car now !</Button>
                  </div> 
                             
              </Grid>
              <Grid item xs={12} sm={4}>
                  
              </Grid>
            </Grid>
          </Container>
        </Grow>
      </Container>
  )
};
