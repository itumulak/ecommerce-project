import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Protected = () => {
    const isLogin = useSelector(state => state.auth.isLogin)
    const router = useRouter()

    useEffect(() => {
        if (!isLogin) {
            router.push('/')
        }
    }, [isLogin])
}

export default Protected