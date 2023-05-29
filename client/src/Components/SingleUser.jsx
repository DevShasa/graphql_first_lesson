import React, {useState, useEffect, useMemo} from 'react'
import { useQuery } from '@apollo/client'
import {FETCH_INDIVIDUAL_USER} from "../GraphQl/Queries"
import UserBox from './UserBox'

const SingleUser = () => {

    const [userId, setUserId] = useState("")
    const [numId, setNumId] = useState()

    const selectUser = ()=>{
        if(userId && typeof(parseInt(userId))==="number"){
            setNumId(parseInt(userId))
        }else{
            alert("User Id input must be a number")
        }
    }

    return (
        <div className='single-box'>
            <div className='singleInput'>
                <input 
                    type='text'
                    placeholder='User id'
                    value={userId}
                    onChange = {(e)=>setUserId(e.target.value)}
                />
                <button onClick={selectUser}>
                    Select User
                </button>
            </div>
            {typeof(numId) ==="number"  && <UserBox id={numId}/>}
        </div>
    )
}

export default SingleUser