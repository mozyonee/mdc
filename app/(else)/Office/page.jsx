"use client"

import { useState } from 'react';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import "./page.css"

const Office = () => {
	const {data: session} = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin?callbackUrl=/Office");
		}
	});

	const [page, setPage] = useState('profile');
	const [result, setResult] = useState(null);

	const handlePageChange = async (newPage) => {
		setPage(newPage);
		setResult(null);
	
		if (newPage !== 'profile') {
			try {
				const response = await fetch(`/api/office/${newPage}`, { method: "GET" });
	
				let data = (await response.json());

				if(!response.ok) {
					throw new Error(data.error);
				} else setResult(data.message);
			} catch (error) {
				console.error("page loading error: ", error);
			} finally {
				console.log('page loaded');
			}
		}
	};

	return (<div className="office">
		<nav className="sideBar">
			<Link href="/Office" onClick={() => handlePageChange('profile')}>Profile</Link>
			<Link href="/Office" onClick={() => handlePageChange('roster')}>Roster</Link>
			<Link href="/Office" onClick={() => handlePageChange('calls')}>Calls</Link>
		</nav>
		{page === 'profile' && (<div className="profile">
			<img src={`/skin/${session?.user?.skin}.png`} alt={session?.user?.skin} height={244} />
			<div className="statistics">
				<p>Name: {session?.user?.name.replace(/_/g, ' ')}.</p>
				<p>Age: {session?.user?.age}.</p>
				<p>Faction: {session?.user?.faction}.</p>
				<p>Rank: {session?.user?.rank}.</p>
				<p>Position: Watch Commander.</p>
				<p>Division: Gang and Narcotics Division.</p>
				<hr></hr>
				<p>Status: {session?.user?.duty ? ("On duty") : "Off duty"}.</p>
				<p>Calls: {session?.user?.fines + 3}.</p>
				<p>Fines: {session?.user?.fines}.</p>
				<p>Bolos: {session?.user?.bolos}.</p>
			</div>
		</div>)}
		{page === 'roster' && result && (
			<div className="calls">
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Rank</th>
						</tr>
					</thead>
					<tbody>
						{result.map((res) => (
							<tr key={res.cID}>
								<td>{res.Name?.replace(/_/g, ' ')}</td>
								<td>{res.Rank}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)}
		{page === 'calls' && result && (
			<div className="calls">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Time</th>
							<th>Name</th>
							<th>Description</th>
							<th>Place</th>
							<th>Location</th>
						</tr>
					</thead>
					<tbody>
						{result.map((res, index) => {
							// Use a combination of ID and index as a fallback key if needed
							const key = res.ID ? res.ID : `row-${index}`;
							return (
								<tr key={key}>
									<td>{res.ID}</td>
									<td>{res.Time}</td>
									<td>{res.Name?.replace(/_/g, ' ')}</td>
									<td>{res.Description}</td>
									<td>{res.Place}</td>
									<td>{res.X}, {res.Y}, {res.Z}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		)}

	</div>);
}

export default Office;