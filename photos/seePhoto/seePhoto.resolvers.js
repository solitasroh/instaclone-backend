import client from '../../client'

export default {
    Query: {
        seePhoto: (_, { id }) => {
            try {
                const photo = client.photo.findUnique({
                    where: {
                        id,
                    },
                })
                return photo
            } catch {
                console.log('error!')
            }
        },
    },
}
