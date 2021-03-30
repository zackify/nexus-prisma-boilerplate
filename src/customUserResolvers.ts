import { mutationField, nonNull, nullable, queryField } from "nexus";
import { appDb } from "./db";

export const storeUser = mutationField("storeUser", {
  type: "User",
  description: "Stores a user manually",
  args: { input: nonNull("UserCreateInput") },
  resolve: async (_, { input }) => {
    return appDb.user.create({ data: input });
  },
});

export const getStoredUser = queryField("getUser", {
  type: nullable("User"),
  args: { id: nullable("Int"), email: nullable("String") },
  description: "gets a user name",
  resolve: async (_, { id, email }) => {
    if (email) return appDb.user.findFirst({ where: { email } });
    if (id) return appDb.user.findFirst({ where: { id } });
    return null;
  },
});
