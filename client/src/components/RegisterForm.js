"use client"

import React, { useEffect, useState } from "react"
import { Alert, Button, Grow, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import InputField from "./InputField";
import StrengthMeter from "./StrengthMeter";
import { register } from "../redux/slices/authSlice";
import { calculatePasswordStrength } from "../util/calculatePasswordStrength";

const RegisterForm = () => {
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
    )
}

export default RegisterForm