import React, { useContext } from 'react'
import { Box, Typography, Grid , Avatar} from '@mui/material'
import { MyContaxt } from './Header'

function DisplayUser() {
  const { selectedUser } = useContext(MyContaxt);
  // console.log("curretly Selected user...",selectedUser);
  return (
    <Box sx={{ flexGrow: 4 }}>
    <Grid container spacing={2} padding={3}>
      <Grid item xs={2}>
        {
          selectedUser?.name &&
          <Avatar sx={{
            width: 60, height: 60,  
            boxShadow: 5,
            border: "2px solid blue",
        }} src={selectedUser.img} />
        }
      </Grid>
      <Grid item xs={6} >
        {
          selectedUser?.name &&
          <>
          <Typography variant='h4'>{selectedUser.name}</Typography>
          <Typography variant='subtitle'>{selectedUser.city}</Typography>
          </>
        }

      </Grid>
      <Grid item xs={4} >
        {
          selectedUser?.name &&
          <>
          <Typography variant='subtitle2'>{selectedUser.email}</Typography>
          <Typography variant='subtitle2'>{selectedUser.phone_no}</Typography>
          <Typography variant='subtitle2'>{selectedUser.address}</Typography>
          </>
        }

      </Grid>

    </Grid>
      

    </Box>
  )
}

export default DisplayUser