import CredentialsProvider from "next-auth/providers/credentials";
import { query } from "../../../../util/db";
import crypto from "crypto";

const sha256Hash = (password, salt) => {
	const hash = crypto.createHash('sha256');
	hash.update(password + salt);
	return hash.digest('hex').toUpperCase();
};
const db_data = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_DATA,
	user: process.env.DB_USER,
	password: process.env.DB_PASS
};


export const options = {
	session: {
		strategy: "jwt"
	},
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				name: {
					label: "Name:",
					type: "text",
					placeholder: "For example, Jacob_Gerkens"
				},
				password: {
					label: "Password:",
					type: "password",
					placeholder: "For example, 123123"
				}
			},
			async authorize(credentials) {
				if (!credentials?.name || !credentials?.password) {
					console.log("ERROR: Missing credentials");
					return null;
				}

				const hashedPassword = sha256Hash(credentials.password, "jobiden");

				try {
					let [user, account, faction, factionRank, tickets, bolos] = await Promise.all([
						query(`SELECT * FROM characters WHERE Name = ? LIMIT 1`, [credentials.name]),
						query(`SELECT pID FROM accounts WHERE pName = (SELECT cOwner FROM characters WHERE Name = ? LIMIT 1) AND pPassword = ? LIMIT 1`, [credentials.name, hashedPassword]),
						query(`SELECT * FROM factions WHERE ID = (SELECT pMember FROM characters WHERE Name = ? LIMIT 1) LIMIT 1`, [credentials.name]),
						query(`SELECT Name FROM faction_ranks WHERE Faction = (SELECT pMember FROM characters WHERE Name = ? LIMIT 1) AND fID = (SELECT pRank FROM characters WHERE Name = ? LIMIT 1) LIMIT 1`, [credentials.name, credentials.name]),
						query(`SELECT count(*) as count FROM tickets WHERE officer = ?`, [credentials.name]),
						query(`SELECT count(*) as count FROM wanted WHERE officer = ?`, [credentials.name])
					]);

					[user, account, faction, factionRank, tickets, bolos] = [user[0], account[0], faction[0], factionRank[0], tickets[0], bolos[0]];

					const resultUser = {
						...user,
						pID: account.pID,
						role: user.pRank >= faction.sRank ? "Supervisor" : "Officer",
						faction: faction.Name,
						rank: factionRank.Name,
						fines: tickets.count,
						bolos: bolos.count
					};

					if (!user) throw new Error("User not found");
					if (!account) throw new Error("Account not found");
					if (!faction) throw new Error("Faction not found");
					if (!factionRank) throw new Error("Faction rank not found");

					if (!(1 <= faction.Type <= 3)) return null;

					return resultUser;

				} catch (error) {
					console.log("Error:", error.message);
					return null;
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.duty = user.FracDuty;
				token.skin = user.pFracSkin;
				token.name = user.Name;
				token.age = user.cAge;
				token.fines = user.fines;
				token.bolos = user.bolos;
				token.faction = user.faction;
				token.rank = user.rank;
				token.role = user.role;
			}
			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.duty = token.duty;
				session.user.skin = token.skin;
				session.user.name = token.name;
				session.user.age = token.age;
				session.user.fines = token.fines;
				session.user.bolos = token.bolos;
				session.user.rank = token.rank;
				session.user.faction = token.faction;
				session.user.role = token.role;
			}
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET
};
