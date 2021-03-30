import { User } from "nexus-prisma";
import { nexusPrisma } from "nexus-plugin-prisma";
import { makeSchema, mutationType, objectType, queryType } from "nexus";
import { getStoredUser, storeUser } from "./customUserResolvers";

export const schema = makeSchema({
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    schema: __dirname + "/generated/schema.graphql",
    typegen: __dirname + "/generated/nexus.ts",
  },
  types: [
    objectType({
      name: User.$name,
      description: User.$description,
      definition(t) {
        t.field(User.id.name, { ...User.id, type: "Int" });
        t.field(User.email.name, User.email);
        t.field(User.name.name, User.name);
      },
    }),
    queryType({
      definition(t) {
        t.crud.user();
        t.crud.users();
      },
    }),
    mutationType({
      definition(t) {
        t.crud.createOneUser();
      },
    }),
    getStoredUser,
    storeUser,
  ],
});
