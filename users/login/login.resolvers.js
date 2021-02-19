import bycrpty from "bcrypt"
import client from "../../client"
import jwt from "jsonwebtoken"

 export default {
     Mutation: {
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