import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

const PersonalInfo = () => {
  return (
    <Box component="form" noValidate autoComplete="off">
        <Typography variant="h6">Personal Information</Typography>
        <TextField label="Email" fullWidth margin="normal" defaultValue="example@example.com" />
        <TextField label="First Name" fullWidth margin="normal" defaultValue="John" />
        <TextField label="Last Name" fullWidth margin="normal" defaultValue="Doe" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>Update</Button>
    </Box>
  )
}

export default PersonalInfo