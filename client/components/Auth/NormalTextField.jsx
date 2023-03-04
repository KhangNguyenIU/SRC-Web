import { Grid, TextField, Typography } from '@mui/material';
import React from 'react'

/**
* @author
* @function NormalTextField
**/

export const NormalTextField = ({ handleChange, initialData, field, label }) => {
 
    return (
        <Grid item xs={6} sm={6} sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="caption">{label}</Typography>
          <TextField
            size="small"
            type={
              field === 'password'
                ? 'password'
                : field === 'email'
                ? 'email'
                : 'text'
            }
            value={initialData[field]}
            onChange={handleChange(field)}
          />
        </Grid>
      );
   
  }
