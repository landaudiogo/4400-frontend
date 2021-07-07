import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import {useFetch} from '../../../components/hooks/useFetch'

const Hello = () => {
    const [makeRequest, setMakeRequest] = useState(false)
    const response = useFetch({uri: '/authentication/logout/', makeRequest})

    return ( 
        <p>hello world</p>
    )
}

export default Hello