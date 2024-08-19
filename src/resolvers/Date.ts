import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import { Timestamp } from 'firebase-admin/firestore';

export const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      // Expecting value to be a string or number
      const date = new Date(value as string|number);

      // Ensure the date is valid
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${value}`);
      }

      return date;
    },
    serialize(value: any) {
      // Handle Firestore Timestamps
      if (value instanceof Timestamp) {
        return value.toDate().toISOString();
      }
      
      // Handle Date objects
      if (value instanceof Date) {
        return value.toISOString();
      }

      // Handle string inputs
      if (typeof value === 'string') {
        const date = new Date(value);

        // Ensure the date is valid
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date string: ${value}`);
        }

        return date.toISOString();
      }

      return null;
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      if (ast.kind === Kind.STRING) {
        const date = new Date(ast.value);

        // Ensure the date is valid
        if (isNaN(date.getTime())) {
          throw new Error(`Invalid date string in literal: ${ast.value}`);
        }

        return date;
      }
      return null;
    },
  }),
};
