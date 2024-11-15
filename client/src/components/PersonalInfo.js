"use client"

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button, Grow, TextField, Typography } from '@mui/material'
import { set } from 'mongoose'

import { updateLoginData } from "../redux/actions";

const PersonalInfo = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const [loginData, setLoginData] = useState({
    email: "",
    currentEmail: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    currentFullName: ""
  })
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoginData({...loginData, email: user?.email, currentEmail: user?.email, currentFullName: user?.providerData[0].displayName})
  }, [user, loginData])

  const handleChangeLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleSubmitLoginData = (e) => {
    e.preventDefault()
    
    console.log(loginData);
        
    dispatch(updateLoginData(loginData))
      .then(response => {        
        if ( response.error ) {
          setError(response.payload)
        }
      })
  }

  return (
    <Box component="form" noValidate autoComplete="off">
        <Typography variant="h6">Personal Information</Typography>
        <TextField onChange={(e) => handleChangeLoginData(e)} name="fullName" label="Full Name" fullWidth margin="normal" defaultValue={loginData.currentFullName} />
        <Typography variant="h6">Login Information</Typography>
        {error && <Grow in><Alert severity="error">{error}</Alert></Grow>}
        <TextField onChange={(e) => handleChangeLoginData(e)} name="email" label="Email" fullWidth margin="normal" defaultValue={loginData.currentEmail} />
        <TextField onChange={(e) => handleChangeLoginData(e)} name="password" label="Password" type="password" fullWidth margin="normal" defaultValue="" />
        <TextField onChange={(e) => handleChangeLoginData(e)} name="confirmPassword" label="Confirm Password" type="password" fullWidth margin="normal" defaultValue="" />
        <Button onClick={(e) => handleSubmitLoginData(e)} variant="contained" color="primary" sx={{ mt: 2 }}>Update</Button>
    </Box>
  )
}

export default PersonalInfo