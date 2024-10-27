import CredentialsProvider from "next-auth/providers/credentials";
import util from "util";
import db from "../../../../util/db";
import crypto from "crypto";

// Promisify the query function from the database utility
const query = util.promisify(db.query).bind(db);

// Function to hash the password using SHA-256
const sha256Hash = (password, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(password + salt);
    return hash.digest('hex').toUpperCase();
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
                    placeholder: "For example, 123456"
                }
            },
            async authorize(credentials) {
                if (!credentials?.name || !credentials?.password) {
                    console.log("ERROR: Missing credentials");
                    return null; // Early return for missing credentials
                }

                const hashedPassword = sha256Hash(credentials.password, "jobiden");

                try {
                    // Use a transaction or handle each query's return carefully
                    const user = await query(
                        `SELECT * FROM characters WHERE Name = ? LIMIT 1`,
                        [credentials.name]
                    );

                    if (!user.length) throw new Error("User not found");

                    const account = await query(
                        `SELECT pID FROM accounts WHERE pName = ? AND pPassword = ? LIMIT 1`,
                        [user[0].cOwner, hashedPassword]
                    );

                    if (!account.length) throw new Error("Account not found");

                    const faction = await query(
                        `SELECT * FROM factions WHERE ID = ? LIMIT 1`,
                        [user[0].pMember]
                    );

                    if (!faction.length) throw new Error("Faction not found");

                    const factionRank = await query(
                        `SELECT Name FROM faction_ranks WHERE Faction = ? AND fID = ? LIMIT 1`,
                        [user[0].pMember, user[0].pRank]
                    );

                    if (!factionRank.length) throw new Error("Faction rank not found");

                    const tickets = await query(
                        `SELECT count(*) as count FROM tickets WHERE officer = ? LIMIT 1`,
                        [user[0].cName]
                    );

                    // Log the successful retrieval of user data
                    console.log("SUCCESS", { user: user[0], account, faction: faction[0], factionRank: factionRank[0], tickets: tickets[0] });

                    // Perform additional checks on faction type
                    if (faction[0].Type < 1 || faction[0].Type > 3) return null;

                    // Assign role and additional user properties
                    const resultUser = {
                        ...user[0],
                        role: user[0].pRank >= faction[0].sRank ? "Supervisor" : "Officer",
                        faction: faction[0].Name,
                        rank: factionRank[0].Name,
                        fines: tickets[0].count,
                    };

                    return resultUser;

                } catch (error) {
                    console.log("ERROR:", error.message);
                    return null; // Return null on any error
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                // Store additional user properties in the token
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
        async session({ session, token }) {
            if (session?.user) {
                // Assign additional token properties to the session user
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
    secret: process.env.NEXTAUTH_SECRET // Use the environment variable for the secret
};
