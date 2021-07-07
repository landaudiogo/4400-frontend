import { useContext, useEffect, useState, useRef } from "react";
import {UserContext} from '../../context/UserContext'
import {useFetch} from './useFetch'



export const useUserCookie = () => {
    const [loading, setLoading] = useState(true)
    const {user, setUser} = useContext(UserContext)
    const isCurrent = useRef(true)
    const response = useFetch({
        uri: '/users/',
        method: 'GET',
    })

    useEffect(() => {
        if (user) {
            setLoading(false)
            setUser(user)
        }
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        if (isCurrent.current) {
            if (!response) {
            } else if (!response.success || response.error) {
                setLoading(false)
            } else if (response.success) {
                setLoading(false)
                setUser(response.data)
            }
        } 
    }, [response])

    return {user, loading};
}
