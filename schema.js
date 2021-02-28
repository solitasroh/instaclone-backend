import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"

const loadedTypes = loadFilesSync(`${__dirname}/**/*.graphql`);
export const typeDefs = mergeTypeDefs(loadedTypes);


const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);
export const resolvers = mergeResolvers(loadedResolvers);