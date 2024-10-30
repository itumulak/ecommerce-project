"use client"

import React, { useEffect, useState } from "react"
import { Alert, Button, Grid2 as Grid, Grow, Stack } from "@mui/material";
import { useDispatch } from "react-redux";

import InputField from "./InputField";
import StrengthMeter from "./StrengthMeter";
import { register } from "../redux/actions";
import { calculatePasswordStrength } from "../util/calculatePasswordStrength";
import Link from "next/link";

const RegisterForm = () => {
    const dispatch = useDispatch()
    const [submitting, setSubmitting] = useState(false)
    const [userInput, setUserInput] = useState({email: '', password: '', confirmPassword: ''})    
    const [passwordError, setPasswordError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [error, setError] = useState(null)

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
            .then(response => {
                if (response.error) {
                    setError(response.payload)
                    setSubmitting(false)
                }
            })
    }

    useEffect(() => {
        const strength = calculatePasswordStrength(userInput.password)
        setPasswordStrength(strength)
        
    }, [userInput])

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error &&
                <Grow in>
                    <Alert severity="error">{error}</Alert>
                </Grow>
            }
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
                <Grid container className="!block text-center">
                    <Grid item>
                        <Link href="/login" passHref>
                            <Button>
                                Already have an account? Sign In.
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Stack>
        </form>
    )
}

export default RegisterForm