import { makeExecutableSchema } from "apollo-server";
import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers} from "@graphql-tools/merge"

console.log(`${__dirname}`);
const loadedTypes = loadFilesSync(`${__dirname}/**/*.graphql`);
const typeDefs = mergeTypeDefs(loadedTypes);


const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutations}.js`);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;