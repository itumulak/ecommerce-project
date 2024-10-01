"use client"

import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

import InputField from '../../components/InputField';
import { login } from "../../redux/slices/authSlice";

const page = () => {
    const dispatch = useDispatch()
    const [submitting, setSubmitting] = useState(false)
    const [userInput, setUserInput] = useState({email: '', password: ''})
    
    const handleChange = (value, name) => {
        setUserInput({ ...userInput, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        dispatch(login(userInput))
    }
    
    return (
        <div className="flex flex-row">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col gap-8 lg:p-24 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Welcome back!</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Stack direction="column" spacing={3}>
                        <InputField 
                            name="email"
                            label="Email"
                            type="email"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={e => handleChange(e.target.value, 'email')}
                        />
                        <InputField 
                            name="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={e => handleChange(e.target.value, 'password')}
                        />
                        <Button disabled={submitting} type="submit" variant="contained" color="primary" size="large" fullWidth>Login</Button>
                    </Stack>
                </form>
            </div>
        </div>
    )
}

export default page