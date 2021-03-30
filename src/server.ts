import { ApolloServer } from "apollo-server";
import { appDb } from "./db";
import { schema } from "./schema";

const server = new ApolloServer({
  schema,
  context: () => {
    return {
      prisma: appDb,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
