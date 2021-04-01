import client from '../client'
let pageCount = 5
export default {
    Photo: {
        user: ({ userId }) => {
            console.log(userId)
            return client.user.findUnique({ where: { id: userId } })
        },
        hashtags: ({ id }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: {
                            id,
                        },
                    },
                },
            })
        },
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
    },
    Hashtag: {
        totalPhotos: ({ id }) => {
            return client.photo.count({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },
                },
            })
        },
        photos: ({ id }, { page }) => {
            return client.photo.findMany({
                where: {
                    hashtags: {
                        some: {
                            id,
                        },
                    },
                },
                take: 5,
                skip: (page - 1) * pageCount,
            })
        },
    },
}
