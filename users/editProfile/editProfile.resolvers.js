import bycrpty from "bcrypt"
import client from "../../client"
import jwt from "jsonwebtoken"

 export default {
     Mutation: {
        editProfile: async (
            _, 
            {firstName, lastName, userName, email, password: newPassword},
            {loggedInUser}) => {
                if(!loggedInUser) {
                    
                }
                let uglyPassword;
                if(newPassword) {
                    uglyPassword = await bycrpty.hash(newPassword, 10);
                }
                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id
                    },
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        ...(uglyPassword && {password: uglyPassword}),
                    },
                });
                if (updatedUser) {
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