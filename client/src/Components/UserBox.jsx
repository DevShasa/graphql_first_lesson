import React, { useEffect } from 'react'
import {FETCH_INDIVIDUAL_USER} from "../GraphQl/Queries"
import { useQuery } from '@apollo/client'

const UserBox = ({id}) => {

    const { error, loading, data } = useQuery(FETCH_INDIVIDUAL_USER, {
        variables:{id: id}
    })
    


    if(loading){
        return <p>Loading...</p>
    }

    if(error){
        return <p>Error: {error.message}</p>
    }

    const user = data?.getSingleUser

    return (
        <p>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.email}</span>
        </p>
    )
}

export default UserBox