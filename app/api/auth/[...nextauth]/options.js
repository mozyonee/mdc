import CredentialsProvider from "next-auth/providers/credentials";
import util from "util";
import db from "../../../../util/db";
import crypto from "crypto";

const query = util.promisify(db.query).bind(db);

const sha256Hash = (password, salt) => {
	const hash = crypto.createHash('sha256');
	const data = password + salt;
	hash.update(data);
	return hash.digest('hex').toUpperCase();
}
export const options = {
	session: {
		strategy: "jwt"
	},
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				name: {
					label: "name:",
					type: "text",
					placeholder: "your name"
				},
				password: {
					label: "password:",
					type: "password",
					placeholder: "your password"
				}
			},
			async authorize(credentials) {
				if(!credentials?.name || !credentials?.password) return null;
				
				const hashedPassword = sha256Hash(credentials.password, "jobiden");
				let user, acc, fac, franks, tickets;

				try {
					user = (await query(`SELECT * FROM characters WHERE (Name = '${credentials.name}' OR cOwner = '${credentials.name}') LIMIT 1`))[0];
					acc = (await query(`SELECT pID FROM accounts WHERE pName = '${user.cOwner}' AND pPassword = '${hashedPassword}' LIMIT 1`))[0];
					fac = (await query(`SELECT * FROM factions WHERE ID = '${user.pMember}' LIMIT 1`))[0];
					franks = (await query(`SELECT Name FROM faction_ranks WHERE Faction = '${user.pMember}' AND fID = '${user.pRank}' LIMIT 1`))[0];
					tickets = (await query(`SELECT count(*) as count FROM tickets WHERE officer = '${user.cName}' LIMIT 1`))[0];
				} catch (error) {
					console.log(error);
					return null;
				}

				if(fac.Type < 1 || fac.Type > 3) return null;

				user.role = user.pRank >= fac.sRank ? "Supervisor" : "Officer";
				user.faction = fac.Name;
				user.rank = franks.Name;
				user.fines = tickets.count;
				
				
				return user;
			}
		})
	],
	callbacks: {
		async jwt({token, user}) {
			if(user) {
				token.duty = user.FracDuty;
				token.skin = user.pFracSkin;
				token.name = user.Name;
				token.age = user.cAge;

				token.fines = user.fines;
				token.faction = user.faction;
				token.rank = user.rank;
				token.role = user.role;
			}
			return token;
		},
		async session({session, token}) {
			if(session?.user) {
				session.user.duty = token.duty;
				session.user.skin = token.skin;
				session.user.name = token.name;
				session.user.age = token.age;
				
				session.user.fines = token.fines;
				session.user.rank = token.rank;
				session.user.faction = token.faction;
				session.user.role = token.role;
			}
			return session;
		}
	},
	secret: process.env.NEXTAUTH_Secret
};