import client from '../../client'
import { protectedResolver } from '../../users/users.utils'
import { processHashtags } from '../photos.utils'

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObj = []
                if (caption) {
                    /// parse caption
                    const hashtags = processHashtags(caption)
                }
                // connectOrCreate (prisma)
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                })
                // add the photo to the hashtags
            }
        ),
    },
}
