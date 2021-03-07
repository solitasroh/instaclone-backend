import fs, { createWriteStream } from "fs";
import bycrpty from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";


 export default {
     Mutation: {
        editProfile: protectedResolver(
            async (
            _, 
            {firstName, lastName, userName, email, password: newPassword, bio, avatar},
            {loggedInUser, protectResolver}
            ) => {
                let avatarUrl = null;
                if (avatar) {
                    const {filename, createReadStream}  = await avatar;
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`               
                    const readStream = createReadStream();
                    // do not load if we use the aws...
                    const writeStream = createWriteStream(process.cwd()  + "/uploads/" + newFilename);
                    readStream.pipe(writeStream); //save on the filesystem
                    avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
                        bio,
                        ...(avatarUrl && {avatar: avatarUrl}),
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