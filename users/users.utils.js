import jwt from 'jsonwebtoken'
import client from '../client'

export const getUser = async (token) => {
    try {
        const { id } = await jwt.verify(token, process.env.SECRET_KEY)
        const user = await client.user.findUnique({ where: { id } })
        if (user) {
            return user
        }
        return null
    } catch {
        return null
    }
}

export const protectResolver = (user) => {
    if (!user) {
        return {
            ok: false,
            error: 'You need to login.',
        }
    }
}

export const protectedResolver = (ourResolver) => (
    root,
    args,
    context,
    info
) => {
    if (!context.loggedInUser) {
        const query = info.operation.operation === 'query'
        if (query) {
            return null
        } else {
            return {
                ok: false,
                error: 'Please log in to perform this action.',
            }
        }
    }
    return ourResolver(root, args, context, info)
}
