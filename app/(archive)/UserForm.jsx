"use client"

// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
// import User from "../(models)/User";

const UserForm = () => {
	// const router = useRouter();
	const [formData, setFormData] = useState({});
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;

		setFormData((prevState) => ({
			...prevState, 
			[name]: value,
		}))
	}
	const handleSubmit = (e) => {
		e.preventDefault();

		signIn("credentials", {
			name: formData.name,
			password: formData.password,
		});
		
		/* const res = await fetch("/api/auth/login", {
			method: "POST",
			body: JSON.stringify({formData}),
			"content-type": "application/json"
		});
		if(!res.ok) {
			const response = await res.json();
			setErrorMessage(response.message);
		} else {
			router.refresh();
			router.push("/");
		} */
	}
	
	return (<>
		<form onSubmit={handleSubmit} method="post" className="flex flex-col gap-3 w-1/2">
			<h1>Create New User</h1>
			<label>Name</label>
			<input type="text" id="name" name="name" onChange={handleChange} required={true} value={formData.name} placeholder="name" className="m-2 bg-slate-400 rounded" />
			<label>Password</label>
			<input type="password" id="password" name="password" onChange={handleChange} required={true} value={formData.password} placeholder="password" className="m-2 bg-slate-400 rounded" />
			<input type="submit" value="Create User" className="bg-blue-300 hover:bg-blue-100" />
		</form>
		<p className="text-red-500">{errorMessage}</p>
	</>)
}

export default UserForm;