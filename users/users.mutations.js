import client from "../client"

 export default {
     Mutation: {
         createAccount: (_, {firstName, lastName, userName, email, password}) => {
            // check if username or email are already on DB.
            const existingUser = client.user.findFirst({
                where: {
                    OR: 
                    [  
                        {userName,},
                        {email,},
                    ]
                },
            })
            // hash password
            // save and return the user


         },
     }
 }