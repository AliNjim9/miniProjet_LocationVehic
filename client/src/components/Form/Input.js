import React from 'react'
import { TextField,Grid } from '@material-ui/core'


export const Input = ({half,name,label,type,handleChange,autoFocus}) => {
    return (
        <Grid item xs={12} sm={half ? 6 :12}>
            <TextField
                name={name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
            />
        </Grid>
    );
};
export default Input;