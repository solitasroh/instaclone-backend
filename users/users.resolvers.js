import client from '../client'
import { protectedResolver } from './users.utils'

export default {
    User: {
        totalFollowing: async ({ id }) => {
            return await client.user.count({
                where: {
                    followers: {
                        some: { id },
                    },
                },
            })
        },
        totalFollowers: async ({ id }) => {
            return await client.user.count({
                where: {
                    following: {
                        some: { id },
                    },
                },
            })
        },
        isMe: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) return false
            return id === loggedInUser.id
        },
        isFollowing: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) return false
            // const exists = await client.user
            //     .findUnique({ where: {id: loggedInUser.id}})
            //     .following( { where: { id, } });
            const exists = await client.user.count({
                where: { userName: loggedInUser.userName },
                following: { some: { id } },
            })
            return Boolean(exists)
        },
        photos: ({ id }) => client.user.findUnique({ where: { id } }),
    },
}
