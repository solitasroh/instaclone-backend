import bycrpty from 'bcrypt';
import client from '../../client';

export default {
	Mutation: {
		createAccount: async (_, { firstName, lastName, userName, email, password }) => {
			// check if username or email are already on DB.
			try {
				const existingUser = await client.user.findFirst({
					where: {
						OR: [
							{
								userName
							},
							{
								email
							}
						]
					}
				});

				if (existingUser) {
					throw new Error('This username/email is already taken');
				}

				const uglyPassword = await bycrpty.hash(password, 10);
				// save and return the user
				await client.user.create({
					data: {
						firstName,
						lastName,
						userName,
						email,
						password: uglyPassword
					}
				});
				return {
					ok: true
				};
			} catch (error) {
				return {
					ok: false,
					error: 'cant create account'
				};
			}
		}
	}
};
