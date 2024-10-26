"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import Image from 'next/image';
import "./page.css";

const Search = () => {
	const ethnoses = ["Latino", "White", "Asian", "Black"];
	const colors = ["#000000", "#F5F5F5", "#2A77A1", "#840410", "#263739", "#86446E", "#D78E10", "#4C75B7", "#BDBEC6", "#5E7072", "#46597A", "#656A79", "#5D7E8D", "#58595A", "#D6DAD6", "#9CA1A3", "#335F3F", "#730E1A", "#7B0A2A", "#9F9D94", "#3B4E78", "#732E3E", "#691E3B", "#96918C", "#515459", "#3F3E45", "#A5A9A7", "#635C5A", "#3D4A68", "#979592", "#421F21", "#5F272B", "#8494AB", "#767B7C", "#646464", "#5A5752", "#252527", "#2D3A35", "#93A396", "#6D7A88", "#221918", "#6F675F", "#7C1C2A", "#5F0A15", "#193826", "#5D1B20", "#9D9872", "#7A7560", "#989586", "#ADB0B0", "#848988", "#304F45", "#4D6268", "#162248", "#272F4B", "#7D6256", "#9EA4AB", "#9C8D71", "#6D1822", "#4E6881", "#9C9C98", "#917347", "#661C26", "#949D9F", "#A4A7A5", "#8E8C46", "#341A1E", "#6A7A8C", "#AAAD8E", "#AB988F", "#851F2E", "#6F8297", "#585853", "#9AA790", "#601A23", "#20202C", "#A4A096", "#AA9D84", "#78222B", "#0E316D", "#722A3F", "#7B715E", "#741D28", "#1E2E32", "#4D322F", "#7C1B44", "#2E5B20", "#395A83", "#6D2837", "#A7A28F", "#AFB1B1", "#364155", "#6D6C6E", "#0F6A89", "#204B6B", "#2B3E57", "#9B9F9D", "#6C8495", "#4D8495", "#AE9B7F", "#406C8F", "#1F253B", "#AB9276", "#134573", "#96816C", "#64686A", "#105082", "#A19983", "#385694", "#525661", "#7F6956", "#8C929A", "#596E87", "#473532", "#44624F", "#730A27", "#223457", "#640D1B", "#A3ADC6", "#695853", "#9B8B80", "#620B1C", "#5B5D5E", "#624428", "#731827", "#1B376D", "#EC6AAE", "#000000", "#177517", "#210606", "#125478", "#452A0D", "#571E1E", "#010701", "#25225A", "#2C89AA", "#8A4DBD", "#35963A", "#B7B7B7", "#464C8D", "#84888C", "#817867", "#817A26", "#6A506F", "#583E6F", "#8CB972", "#824F78", "#6D276A", "#1E1D13", "#1E1306", "#1F2518", "#2C4531", "#1E4C99", "#2E5F43", "#1E9948", "#1E9999", "#999976", "#7C8499", "#992E1E", "#2C1E08", "#142407", "#993E4D", "#1E4C99", "#198181", "#1A292A", "#16616F", "#1B6687", "#6C3F99", "#481A0E", "#7A7399", "#746D99", "#53387E", "#222407", "#3E190C", "#46210E", "#991E1E", "#8D4C8D", "#805B80", "#7B3E7E", "#3C1737", "#733517", "#781818", "#83341A", "#8E2F1C", "#7E3E53", "#7C6D7C", "#020C02", "#072407", "#163012", "#16301B", "#642B4F", "#368452", "#999590", "#818D96", "#99991E", "#7F994C", "#839292", "#788222", "#2B3C99", "#3A3A0B", "#8A794E", "#0E1F49", "#15371C", "#15273A", "#375775", "#060820", "#071326", "#20394B", "#2C5089", "#15426C", "#103250", "#241663", "#692015", "#8C8D94", "#516013", "#090F02", "#8C573A", "#52888E", "#995C52", "#99581E", "#993A63", "#998F4E", "#99311E", "#0D1842", "#521E1E", "#42420D", "#4C991E", "#082A1D", "#96821D", "#197F19", "#3B141F", "#745217", "#893F8D", "#7E1A6C", "#0B370B", "#27450D", "#071F24", "#784573", "#8A653A", "#732617", "#319490", "#56941D", "#59163D", "#1B8A2F", "#38160B", "#041804", "#355D8E", "#2E3F5B", "#561A28", "#4E0E27", "#706C67", "#3B3E42", "#2E2D33", "#7B7E7D", "#4A4442", "#28344E"];
	const vehicles = ["Landstalker", "Bravura", "Buffalo", "Linerunner", "Pereniel", "Sentinel", "Dumper", "Firetruck", "Trashmaster", "Stretch", "Manana", "Infernus", "Voodoo", "Pony", "Mule", "Cheetah", "Ambulance", "Leviathan", "Moonbeam", "Esperanto", "Taxi", "Washington", "Bobcat", "Mr Whoopee", "BF Injection", "Hunter", "Premier", "Enforcer", "Securicar", "Banshee", "Predator", "Bus", "Rhino", "Barracks", "Hotknife", "Trailer", "Previon", "Coach", "Cabbie", "Stallion", "Rumpo", "RC Bandit", "Romero", "Packer", "Monster", "Admiral", "Squalo", "Seasparrow", "Pizzaboy", "Tram", "Trailer", "Turismo", "Speeder", "Reefer", "Tropic", "Flatbed", "Yankee", "Caddy", "Solair", "Berkley's RC Van", "Skimmer", "PCJ-600", "Faggio", "Freeway", "RC Baron", "RC Raider", "Glendale", "Oceanic", "Sanchez", "Sparrow", "Patriot", "Quad", "Coastguard", "Dinghy", "Hermes", "Sabre", "Rustler", "ZR-350", "Walton", "Regina", "Comet", "BMX", "Burrito", "Camper", "Marquis", "Baggage", "Dozer", "Maverick", "News Chopper", "Rancher", "FBI Rancher", "Virgo", "Greenwood", "Jetmax", "Hotring", "Sandking", "Blista", "Police Maverick", "Boxville", "Benson", "Mesa", "RC Goblin", "Hotring-Racer", "Hotring-Racer", "Bloodring-Banger", "Rancher", "Super-GT", "Elegant", "Journey", "Bike", "Mountain Bike", "Beagle", "Cropdust", "Stunt", "Tanker", "RoadTrain", "Nebula", "Majestic", "Buccaneer", "Shamal", "Hydra", "FCR-900", "NRG-500", "HPV1000", "Cement Truck", "Tow Truck", "Fortune", "Cadrona", "FBI Truck", "Willard", "Forklift", "Tractor", "Combine", "Feltzer", "Remington", "Slamvan", "Blade", "Freight", "Streak", "Vortex", "Vincent", "Bullet", "Clover", "Sadler", "Firetruck", "Hustler", "Intruder", "Primo", "Cargobob", "Tampa", "Sunrise", "Merit", "Utility", "Nevada", "Yosemite", "Windsor", "Monster Truck A", "Monster Truck B", "Uranus", "Jester", "Sultan", "Stratum", "Elegy", "Raindance", "RC Tiger", "Flash", "Tahoma", "Savanna", "Bandito", "Freight", "Trailer", "Kart", "Mower", "Duneride", "Sweeper", "Broadway", "Tornado", "AT-400", "DFT-30", "Huntley", "Stafford", "BF-400", "Newsvan", "Tug", "Trailer", "Emperor", "Wayfarer", "Euros", "Hotdog", "Club", "Trailer", "Trailer", "Andromada", "Dodo", "RC Cam", "Launch", "Police Car", "Police Car", "Police Car", "Police Ranger", "Picador", "S.W.A.T. Van", "Alpha", "Phoenix", "Glendale", "Sadler", "Luggage Trailer", "Luggage Trailer", "Stair Trailer", "Boxville", "Farm Plow", "Utility Trailer"];
	const businesses = ["Grocery store", "Clothing store", "Electronics store", "Gun shop", "Car dealership", "Gas station", "Restaurant", "Bar", "Casino", "Real estate agency"];

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const {data: session} = useSession({
		required: true,
		onUnauthenticated() {
			redirect("/api/auth/signin?callbackUrl=/Search");
		}
	});

	const submitForm = async (event) => {
		event.preventDefault()
	
		setIsLoading(true);
		setError(null);
		setResult(null);

		try {
			const formData = new FormData(event.currentTarget);

			const response = await fetch("/api/search", {
				method: "POST",
				body: JSON.stringify({ filter: formData.get("filter").replace(/#/g, '').replace(/\s+/g, '_'), target: formData.get("target")})
			});

			let data = (await response.json());

			if(!response.ok) {
				throw new Error(data.error);
			} else setResult(data.message);
		} catch (error) {
			console.error(error);
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	}
	
	const submitWanted = async (event) => {
		event.preventDefault()
	
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			let wantid;
			switch(result.searched) {
				case "person": wantid = result.cID; break;
				case "vehicle": wantid = result.id; break;
				case "house": wantid = result.id; break;
				case "business": wantid = result.ID; break;
			}

			const response = await fetch("/api/search/wanted/add", {
				method: "POST",
				body: JSON.stringify({
					target: result.searched,
					wanted: wantid,
					officer: session?.user?.name,
					reason: formData.get("reason"),
					jail: formData.get("jail"),
					date: (new Date().getTime() / 1000).toFixed()
				})
			});

			let data = (await response.json());

			if(!response.ok) {
				throw new Error(data.error);
			} else result.wanted = data.message;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}
	
	const submitTicket = async (event) => {
		event.preventDefault()
	
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			let fineid;
			switch(result.searched) {
				case "person": fineid = result.cID; break;
				case "vehicle": fineid = result.id; break;
				case "house": fineid = result.id; break;
				case "business": fineid = result.ID; break;
			}

			const response = await fetch("/api/search/ticket/add", {
				method: "POST",
				body: JSON.stringify({
					target: result.searched,
					fined: fineid,
					officer: session?.user?.name,
					reason: formData.get("reason"),
					price: formData.get("price"),
					date: (new Date().getTime() / 1000).toFixed()
				})
			});

			let data = (await response.json());

			if(!response.ok) {
				throw new Error(data.error);
			} else result.tickets = data.message;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const onRemoveWanted = async (event) => {
		event.preventDefault()
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			let wantid;
			switch(result.searched) {
				case "person": wantid = result.cID; break;
				case "vehicle": wantid = result.id; break;
				case "house": wantid = result.id; break;
				case "business": wantid = result.ID; break;
			}

			const response = await fetch("/api/search/wanted/remove", {
				method: "POST",
				body: JSON.stringify({
					target: result.searched,
					wanted: wantid,
					id: formData.get("id")
				})
			});

			let data = (await response.json());

			if(!response.ok) {
				throw new Error(data.error);
			} else result.wanted = data.message;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const onRemoveTicket = async (event) => {
		event.preventDefault()
		setIsLoading(true);

		try {
			const formData = new FormData(event.currentTarget);

			let fineid;
			switch(result.searched) {
				case "person": fineid = result.cID; break;
				case "vehicle": fineid = result.id; break;
				case "house": fineid = result.id; break;
				case "business": fineid = result.ID; break;
			}

			const response = await fetch("/api/search/ticket/remove", {
				method: "POST",
				body: JSON.stringify({
					target: result.searched,
					fined: fineid,
					id: formData.get("id")
				})
			});

			let data = (await response.json());

			if(!response.ok) {
				throw new Error(data.error);
			} else result.tickets = data.message;
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const [selectedTarget, setSelectedTarget] = useState("person");
	const handleSelectChange = (event) => {
		setSelectedTarget(event.target.value);
	};

	const exampleText = {
		person: "For example, Brian Randall.",
		vehicle: "For example, SA149LS.",
		house: "For example, #58.",
		business: "For example, #34.",
	}[selectedTarget]; 
   
	return (<>
		<form onSubmit={submitForm}>
			<input name="filter" required={true} />
			<select name="target" required={true} onChange={handleSelectChange} value={selectedTarget}>
				<option value="person">Person</option>
				<option value="vehicle">Vehicle</option>
				<option value="house">House</option>
				<option value="business">Business</option>
			</select>
			<button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Search'}</button>
		</form>
		<p>{exampleText}</p>
		{error && <p style={{ color: 'red' }}>{error}</p>}
		{result && (<div className="result">
			<div className="profile">
				{result.searched === "person" && (<>
					<img src={`/skin/${result.cSkin}.png`} alt={result.cSkin} height={250} />
					<ul>
						<li>Name: {result.Name.replace(/_/g, ' ')}.</li>
						<li>Sex: {result.cSex ? "Female" : "Male"}.</li>
						<li>Ethnos: {ethnoses[result.cEthnos]}.</li>
						<li>Age: {result.cAge}.</li>
						<li>Residence: {result.house ? result.house : "None"}.</li>
						<li>Vehicles: {result.vehicle.map((veh, key) => (key !== 0 ? `, ${veh.number}` : veh.number)).join('')}.</li>
						<li>Licenses: {result.TLicCar && ("Driver's;")} {result.TLicAir && ("Pilot's;")} {result.TLicBoat && ("Skipper's;")} {result.TLicWeapon && ("Weapon.")}</li>
						
					</ul>
				</>)}
				
				{result.searched === "vehicle" && (<>
					<img src={`/vehicle/${result.model}.png`} alt={result.model} height={108} />
					<ul>
						<li>Owner: {result.owner.replace(/_/g, ' ')}.</li>
						<li>Model: {vehicles[result.model-400]}.</li>
						<li>Number: {result.number}.</li>
						<li>Color 1: <span style={{ color: colors[result.color_one] }}>█████</span>.</li>
						<li>Color 2: <span style={{ color: colors[result.color_two] }}>█████</span>.</li>
					</ul>
				</>)}
				
				{result.searched === "house" && (<>
					<ul>
						{result.ownerid ? (<li>Owner: {result.owner.replace(/_/g, ' ')}.</li>) : null}
						<li>Number: #{result.id}.</li>
						<li>Location: {result.x}, {result.y}, {result.z}.</li>
						{result.ownerid ? null : (<li>Price: ${result.price}.</li>)}
					</ul>
				</>)}
				{result.searched === "business" && (<>
					<ul>
						{result.Owner ? (<li>Owner: {result.owner.replace(/_/g, ' ')}.</li>) : null}
						<li>Name: {result.Name}.</li>
						<li>Number: #{result.ID}.</li>
						<li>Type: {businesses[result.Type]}.</li>
						<li>Location: {result.X}, {result.Y}, {result.Z}.</li>
						{result.Owner ? null : (<li>Price: ${result.Price}.</li>)}
					</ul>
				</>)}
			</div>
			<div className="police">
				{result.wanted.length !== 0 ? (
					<table>
						<caption>
							Wanted:
						</caption>
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Officer</th>
								<th scope="col">Reason</th>
								<th scope="col">Punishment</th>
							</tr>
						</thead>
						<tbody>
							{result.wanted.map(want => <tr key={want.id}><td>{(new Date(want.date * 1000)).toLocaleDateString()}</td><td>{want.officer}</td><td>{want.reason}</td><td>{want.jail} years</td><td><form onSubmit={onRemoveWanted}><input type="hidden" name="id" value={want.id} /><button type="submit" disabled={isLoading}>{isLoading ? '...' : (<AiOutlineClose size={20} />)}</button></form></td></tr>)}
						</tbody>
					</table>
				) : (
					<p>Not currently wanted.</p>
				)}
				<form onSubmit={submitWanted} className="record">
					<input name="reason" placeholder="reason" required={true} />
					<input type="number" name="jail" placeholder="imprisonment" required={true} min='1' />
					<button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Add'}</button>
				</form>
				
				{result.tickets.length !== 0 ? (
					<table>
						<caption>
							Fines:
						</caption>
						<thead>
							<tr>
								<th scope="col">Date</th>
								<th scope="col">Officer</th>
								<th scope="col">Reason</th>
								<th scope="col">Punishment</th>
							</tr>
						</thead>
						<tbody>
							{result.tickets.map(ticket => <tr><td>{(new Date(ticket.date * 1000)).toLocaleDateString()}</td><td>{ticket.officer}</td><td>{ticket.reason}</td><td>${ticket.price}</td><td><form onSubmit={onRemoveTicket}><input type="hidden" name="id" value={ticket.id} /><button type="submit" disabled={isLoading}>{isLoading ? '...' : (<AiOutlineClose size={20} />)}</button></form></td></tr>)}
						</tbody>
					</table>
				) : (
					<p>No active fines.</p>
				)}
				<form onSubmit={submitTicket} className="record">
					<input name="reason" placeholder="reason" required={true} />
					<input type="number" name="price" placeholder="price" required={true} />
					<button type="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Add'}</button>
				</form>
			</div>
		</div>)}
	</>);
}

export default Search;