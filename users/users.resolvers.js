import client from '../client'
import { protectedResolver } from './users.utils'

export default {
    User: {
        totalFollowing: ({ id }) => {
            return client.user.count({
                where: {
                    followers: {
                        some: { id },
                    },
                },
            })
        },
        totalFollowers: ({ id }) => {
            return client.user.count({
                where: {
                    following: {
                        some: { id },
                    },
                },
            })
        },
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) return false
            return id === loggedInUser.id
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) return false
            const exists = await client.user.count({
                where: {
                    userName: loggedInUser.userName,
                    following: { some: { id } },
                },
            })
            return Boolean(exists)
        },
        photos: ({ id }) => client.user.findUnique({ where: { id } }).photos(),
    },
}
