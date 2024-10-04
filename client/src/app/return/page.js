"use client"

import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material';
import { saveOrder, stripeSession } from '../../redux/slices/cartSlice'

const page = () => {
    const dispatch = useDispatch()
    const isMounted = useRef(false)
    const router = useRouter()
    const user = useSelector(state => state.auth.user)
    const searchParams = useSearchParams()
    const sessionId = searchParams?.get('session_id')
    const [processingOrder, setProcessingOrder] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {                
        if (sessionId && ! isMounted.current && typeof user.uid !== 'undefined') {
            isMounted.current = true
            handleFetchSession(sessionId, user.uid)
        }
    }, [user])

    const handleFetchSession = async (sessionId, userId) => {        
        if (! processingOrder ) {
            setProcessingOrder(true)
            dispatch(stripeSession({sessionId})).then(data => {
                if ( ! data.error ) {
                    console.log('saving order');
                    
                    dispatch(saveOrder({
                        items: data.payload.items.data, 
                        session: data.payload.session,
                        userId
                    }))
                        .then(data => {
                            if ( ! data.error ) {
                                router.push('/')
                            }
                        })
                }
            })
        }              
    }

    return (
        <div className="text-center">
            {loading && <div className="flex flex-col gap-4"><CircularProgress className="m-auto" />Processing your order... Please wait. </div>}
        </div>
    )
}

export default page