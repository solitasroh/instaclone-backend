import client from "../../client"
let pageCount = 5
export default {
    Query: {
        searchUsers: async (_, { keyword, cursor}) => {
            console.log(keyword.toLowerCase())
            const users = await client.user.findMany({
                where: {
                    userName: {
                        startsWith: keyword.toLowerCase(),
                    }
                },
                
                take: pageCount,
                skip: cursor ? 1 : 0,
                ...(cursor && { cursor: { id: cursor }})
            })
            return users;
        },
    }
}