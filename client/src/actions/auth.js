import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData,navigation,setMessage) => async(dispatch) =>{
    try {
        const { data } = await api.signIn(formData);

        dispatch({type: AUTH, data});

        navigation('/home');
        window.location.reload(false)
    } catch (err) {
        console.log(err.response.data);
        if(err.message==="Request failed with status code 404")
            setMessage("Compte doesn't exist !");
        if(err.message==="Request failed with status code 400")
        setMessage("Invalid password !");
    }

};

export const signup = (formData,navigation,setMessage) => async(dispatch) =>{
    try {
        const { data } = await api.signUp(formData);

        dispatch({type: AUTH, data});

        navigation('/home');
        window.location.reload(false)
    } catch (err) {
        console.log(err.message);
        if(err.message==="Request failed with status code 400")
            setMessage("User already exists !");
        
    }

};