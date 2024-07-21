import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Timestamp } from 'firebase-admin/firestore';

export const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      // value from the client, which can be a string or number
      return new Date(value as any);
    },
    serialize(value: any) {
      // value sent to the client
      if (value instanceof Timestamp) {
        // If the value is a Firestore Timestamp, convert it to a Date
        return value.toDate().toISOString();
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      return null;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)); // ast value is always in string format
      }
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
};
