import React, { useEffect } from 'react'
import {useQuery, gql} from "@apollo/client"
import { LOAD_USERS } from "../GraphQl/Queries"

export default function GetUsers() {

    const { error, loading, data } = useQuery(LOAD_USERS)

    useEffect(()=>{
        console.log(data)
    },[data])

    return (
        <div>
            {/* This is where you display the users */}
        </div>
    )
}
