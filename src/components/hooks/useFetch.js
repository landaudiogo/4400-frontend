import { useState, useEffect, useReducer, useRef } from "react"
const base64 = require('base-64')


/* 
    Personalized hook to fetch data from the server 

    Initially when calling this function the response is set to null
    as the data has not been loaded yet. 

    There are 2 possible outcomes: 
        - Data response is successful
        - Something occurred in the server side which will be 
          interpreted as an error
    
    Return
    ======

    The object returned contains the following data:
    :obj: contains the response body
    :statusCode: the status code provided by the server
    :success: describes whether the returned http response was successful 
    :error: is true if there is a problem on the request made (ex. server 
        user is disconnected)
*/ 
const options = {
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
}

export const useFetch = ({ uri, method, basic_auth, params, body, makeRequest=true }) => {
    const [response, setResponse] = useState(null)
    const isCurrent = useRef(true)

    useEffect(() => {
        return () => {
            isCurrent.current = false
        }
    }, [])

    useEffect(() => {
        if (!makeRequest) {
            return
        }
        const url = new URL('http://4400app.com:5000/api/v1' + uri)
        url.search = new URLSearchParams(params).toString()

        options.method = method ? method : 'GET'
        if (body) 
            options.body = JSON.stringify(body)
        if (basic_auth)
            options.headers.Authorization = `Basic ${base64.encode(basic_auth.username + ':' + basic_auth.password)}`

        const obj_status = (res) => {
            return res.json()
                .then(obj => {
                    if (isCurrent.current) {
                        setResponse({
                            error: false, 
                            data: obj, 
                            statusCode: res.status,
                            success: res.ok
                        })
                    }
                }) 
        }

        fetch(url, options)
            .then(obj_status)
            .catch(exc => {
                if (isCurrent.current) {
                    setResponse({error: true}) 
                }
            }) 

    }, [setResponse, uri, method, basic_auth, params, body, makeRequest])

    return response
}