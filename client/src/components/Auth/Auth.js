import React,{ useState } from 'react';
import { Avatar,Button,Paper,Typography,Grid,Container } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import useStyles from './AuthStyles.js';
import { Input } from './Input.js';
import {signin,signup} from '../../actions/auth.js';

const intialState={nomClient:'',adresseClient:'',telClient:'',mailClient:'',login:'',password:'' };

export const Auth =() =>{
    
    const classes=useStyles();
    const [isSignup, setIsSignup] = useState(false);
    const [formData,setFormData] = useState(intialState);
    const [message,setMessage] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigate();
    

    const handleSubmit= (e)=> {
        e.preventDefault();
        if(isSignup){
            dispatch(signup(formData,navigation,setMessage));
        }else{
            dispatch(signin(formData,navigation,setMessage));
        }
    };

    const handleChange= (e)=> {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const switchMode=()=>{
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setMessage("");
    }
      return(
          
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockIcon/>
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <Typography color="error">{message}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="nomClient" label="Nom" handleChange={handleChange} autofocus half />
                                    <Input name="adresseClient" label="Adresse" handleChange={handleChange} half />
                                
                                <Input name="telClient" label="Telephone" handleChange={handleChange} half />
                                <Input name="mailClient" label="Email" handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name="login" label ="Login" handleChange={handleChange} />
                        <Input name="password" label ="Password" handleChange={handleChange} type="password" />
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className="">
                        {isSignup?'Sign Up':'Sign In'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            
                            <Button onClick={switchMode}>
                                {isSignup?'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    )
  };