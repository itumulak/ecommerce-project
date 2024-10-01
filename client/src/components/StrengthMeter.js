import React from 'react'

const StrengthMeter = ({score = 0}) => {
    const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"]
    const strengthColor = ["#dc3545", "#dc3545", "#ffc107", "#28a745", "limegreen"]
    return (
        <div>Password Strength: <span className="font-semibold" style={{color: strengthColor[score]}}>{strengthText[score]}</span></div>
    )
}

export default StrengthMeter