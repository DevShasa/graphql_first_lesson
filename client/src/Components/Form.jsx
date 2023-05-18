import React, {useState} from "react";
import { useMutation } from "@apollo/client";
import {CREATE_USER_MUTATION} from "../GraphQl/Mutations"

function Form() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

	const [createUser, {error}] = useMutation(CREATE_USER_MUTATION)

	const addUser = async() =>{
		const allPresent = [firstName, lastName, email, password].every(field => field !== "")

		if(allPresent){
			
			createUser({
				variables:{
					firstName: firstName,
					lastName:lastName,
					email: email,
					password:password,
				},
			})
			.then((data)=>{
				setFirstName("")
				setLastName("")
				setEmail("")
				setPassword("")

				console.log("Data returned after creating user", data)
			}).catch(error=>{
				console.log("Error creating new user--->", error)

			})
		}else{
			alert("Please fill in all the fields")
		}
	}

	return (
		<div className="form-box">
			<input
				type="text"
				placeholder="First Name"
				value={firstName}
				onChange={(e) => {
					setFirstName(e.target.value);
				}}
			/>
			<input
				type="text"
				placeholder="Last Name"
				value={lastName}
				onChange={(e) => {
					setLastName(e.target.value);
				}}
			/>
			<input
				type="email"
				placeholder="Email"
				value={email}
				onChange={(e) => {
					setEmail(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<button onClick={addUser}> Create User</button>
		</div>
	);
}

export default Form;
