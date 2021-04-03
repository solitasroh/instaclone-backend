import fs, { createWriteStream } from 'fs'
import bycrpty from 'bcrypt'
import client from '../../client'
import { protectedResolver } from '../users.utils'
import { uploadToS3 } from '../../shared/shared.utils'

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    userName,
                    email,
                    password: newPassword,
                    bio,
                    avatar,
                },
                { loggedInUser, protectResolver }
            ) => {
                let avatarUrl = null
                console.log(avatar)
                if (avatar) {
                    avatarUrl = await uploadToS3(
                        avatar,
                        loggedInUser.id,
                        'avatars'
                    )
                }

                let uglyPassword
                if (newPassword) {
                    uglyPassword = await bycrpty.hash(newPassword, 10)
                }
                const updatedUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        userName,
                        email,
                        bio,
                        ...(avatarUrl && { avatar: avatarUrl }),
                        ...(uglyPassword && { password: uglyPassword }),
                    },
                })
                if (updatedUser) {
                    return {
                        ok: true,
                    }
                } else {
                    return {
                        ok: false,
                        error: 'could not update profile',
                    }
                }
            }
        ),
    },
}
