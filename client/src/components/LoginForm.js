"use client"

import React, { useEffect, useState } from 'react';
import { Alert, Button, Grid2 as Grid, Grow, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import InputField from '../components/InputField';
import { login } from '../redux/actions';
import Link from 'next/link';

const LoginForm = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const user = useSelector((state) => state.auth.user)
    const [submitting, setSubmitting] = useState(false)
    const [userInput, setUserInput] = useState({email: '', password: ''})
    const [error, setError] = useState(null)
    
    const handleChange = (value, name) => {
        setUserInput({ ...userInput, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        dispatch(login(userInput))
            .then(response => {
                if (response.error) {
                    setError(response.payload)
                    setSubmitting(false)
                }
            })
    }

    useEffect(() => {
        if ( user ) {
            router.push('/')
        }
    }, [user, router])

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
                <Grow in>
                    <Alert severity="error">{error}</Alert>
                </Grow>
            )}
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
                <Grid container className="!block text-center">
                    <Grid item>
                        <Link href="/register" passHref>
                            <Button>
                                No account? Sign Up.
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Stack>
        </form>
    )
}

export default LoginForm