import bycrpty from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";
import { protectedResolver } from "../users.utils";


 export default {
     Mutation: {
        editProfile: protectedResolver(
            async (
            _, 
            {firstName, lastName, userName, email, password: newPassword, bio, avatar},
            {loggedInUser, protectResolver}
            ) => {
                const {filename, createReadStream}  = await avatar;
                const stream = createReadStream();
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
                        bio,
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
            }
        ),
     }
 }