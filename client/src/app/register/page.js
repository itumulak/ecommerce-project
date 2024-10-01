"use client"

import React, { useEffect, useState } from "react"
import { Alert, Button, Grow, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import InputField from "../../components/InputField";
import StrengthMeter from "../../components/StrengthMeter";
import { register } from "../../redux/slices/authSlice";
import { calculatePasswordStrength } from "../../util/calculatePasswordStrength";

const page = () => {
    const dispatch = useDispatch()
    const [submitting, setSubmitting] = useState(false)
    const [userInput, setUserInput] = useState({email: '', password: '', confirmPassword: ''})    
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (value, name) => {
        setUserInput({ ...userInput, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (userInput.password !== userInput.confirmPassword) {
            setPasswordError('Passwords do not match.')
            return
        }

        setPasswordError('')
        setSubmitting(true)
        dispatch(register(userInput))
    }

    useEffect(() => {
        const strength = calculatePasswordStrength(userInput.password)
        setPasswordStrength(strength)
        
    }, [userInput])

    return (
        <div className="flex flex-row">
            <div className="w-1/2 h-screen hidden lg:block">
                <img src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826" alt="Placeholder Image" className="object-cover w-full h-full"/>
            </div>
            <div className="flex flex-col gap-8 lg:p-24 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Stack direction="column" spacing={3}>
                        {passwordError && <Grow in={true}><Alert variant="filled" severity="error">{passwordError}</Alert></Grow>}
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
                        {userInput.password.length > 0 && <StrengthMeter score={passwordStrength} />}
                        <InputField 
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            variant="outlined"
                            required
                            fullWidth
                            onChange={e => handleChange(e.target.value, 'confirmPassword')}
                        />
                        <Button disabled={submitting} type="submit" variant="contained" color="primary" size="large" fullWidth>{submitting ? 'Registering...' : 'Register' }</Button>
                    </Stack>
                </form>
            </div>
        </div>
    )
}

export default page