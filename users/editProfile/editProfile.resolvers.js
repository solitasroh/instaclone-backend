import bycrpty from "bcrypt"
import client from "../../client"
import jwt from "jsonwebtoken"

 export default {
     Mutation: {
        editProfile: async (_, {firstName, lastName, userName, email, password: newPassword}) => {
            if(newPassword) {
                let uglyPassword = await bycrpty.hash(newPassword, 10);
            }
            const ok = await client.user.update({
                where: {
                    id: 1
                },
                data: {
                    firstName,
                    lastName,
                    userName,
                    email,
                    ...(uglyPassword && {password: uglyPassword}),
                },
            });
            if (ok) {
                return {
                    ok: true,
                };
            } else {
                return {
                    ok: false,
                    error: "could not update profile"
                }
            }
        },
     }
 }