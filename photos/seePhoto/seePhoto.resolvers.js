import client from '../../client'

export default {
    Query: {
        seePhoto: (_, { id }) => {
            try {
                console.log(`test {id}`)
                const photo = client.photo.findUnique({
                    where: {
                        id,
                    },
                })
                console.log(photo)
                return photo
            } catch {
                console.log('error!')
            }
        },
    },
}
