import client from '../../client'
import { protectedResolver } from '../../users/users.utils'

export default {
    Query: {
        seeRoom: protectedResolver(async (_, { id }, { loggedInUser }) => {
            return client.room.findFirst({
                where: {
                    id,
                    users: {
                        some: {
                            id: loggedInUser.id,
                        },
                    },
                },
            })
        }),
    },
}
