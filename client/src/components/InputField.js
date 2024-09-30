import React, { useState } from 'react'
import { IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const InputField = ({name, label, type = "text", ...props}) => {
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    
    return (
        <TextField 
            name={name}
            label={label}
            type={type === "password" ? showPassword ? "text" : "password" : type}
            slotProps={{
                input: type === "password" ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : {}
            }}
            {...props}
        />
    )
}

export default InputField