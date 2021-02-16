import bycrpty from "bcrypt"
import client from "../client"
import jwt from "jsonwebtoken"

 export default {
     Mutation: {
        createAccount: async (_, {firstName, lastName, userName, email, password}) => {
            // check if username or email are already on DB.
            try {
                const existingUser = await client.user.findFirst({
                    where: {
                        OR: 
                        [  
                            {
                                userName,
                            },
                            {
                                email,
                            },
                        ]
                    },
                });

                if (existingUser) {
                    throw new Error("This username/email is already taken");
                }

                const uglyPassword = await bycrpty.hash(password, 10);
                 // save and return the user
                return client.user.create({data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: uglyPassword
                }});
            } catch (error) {
                return error;
            }
        },

        login: async(_, {userName, password}) => {
            const findUser = await client.user.findUnique({where: {userName}});
            if (!findUser) {
                return {
                    ok: false,
                    error: "User not found"
                };
            }
            // check password with arg.password
            const passwordMatched = await bycrpty.compare(password, findUser.password);
            if (!passwordMatched) {
                return {
                    ok: false,
                    error: "Password not matched"
                }
            }
            //issue a token and send it to user
            const token = jwt.sign({id:findUser.id}, process.env.SECRET_KEY)
            return {
                ok: true,
                token
            }
        }

     }
 }