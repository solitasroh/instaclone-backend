import client from '../../client'

export default {
    Query: {
        /// TODO: pagination
        seePhotoComments: (_, { id }) =>
            client.comment.findMany({
                where: {
                    photoId: id,
                },
                orderBy: {
                    createdAt: 'asc',
                },
            }),
    },
}
