import client from "../../client"
import { protectedResolver } from "../users.utils"
let pageCount = 5
export default {
    Query: {
        
        seeFollowers: async (_, {userName, page}) => {
            const followers = await client.user
                        .findUnique({ where: { userName } })
                        .followers({take: 5, skip: (page-1) * pageCount});
            const totalFollowers = await client.user.count({
                where: {following: {some: {userName}}}
            });

            return {
                ok: true,
                followers,
                totalPage: Math.ceil(totalFollowers / pageCount)
            }
        },
    }
}