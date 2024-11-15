"use client"

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material';

import { saveOrderToDB, stripeSession } from "../redux/actions";
import { emptyCart } from "../redux/slices/cartSlice";

const ProcessOrder = () => {
    const dispatch = useDispatch()
    const isMounted = useRef(false)
    const router = useRouter()
    const user = useSelector(state => state.auth.user)
    const [processingOrder, setProcessingOrder] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [sessionId, setSessionId] = useState(null)

    useEffect(() => {                
        if (sessionId && ! isMounted.current && typeof user?.uid !== 'undefined') {
            isMounted.current = true
            handleFetchSession({sessionId, userId: user?.uid})
        }
    }, [user, sessionId])

    const GetSessionId = () => {
        const searchParams = useSearchParams()
        setSessionId(searchParams.get('session_id'))
    }

    const handleFetchSession = async ({sessionId, userId}) => {        
        if (! processingOrder ) {
            setProcessingOrder(true)
            
            dispatch(stripeSession({sessionId, userId})).then(data => {
                if ( ! data.error ) {
                    console.log('saving order');
                    
                    dispatch(saveOrderToDB({
                        items: data.payload.items.data, 
                        session: data.payload.session,
                        userId
                    }))
                        .then(data => {
                            if ( ! data.error ) {
                                dispatch(emptyCart())
                                router.push('/')
                            }
                        })
                }
            })
        }              
    }

    return (
        <div className="text-center">
            <Suspense>
                <GetSessionId />
            </Suspense>
            {loading && <div className="flex flex-col gap-4"><CircularProgress className="m-auto" />Processing your order... Please wait. </div>}
        </div>
    )
}

export default ProcessOrder