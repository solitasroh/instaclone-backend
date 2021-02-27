import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
   try{
        const {  id } = await jwt.verify(token, process.env.SECRET_KEY);
        const user = await client.user.findUnique({where: {id}});
        if (user) {
            return user;
        }
        return null;
   } catch {
        return null;
   }
}