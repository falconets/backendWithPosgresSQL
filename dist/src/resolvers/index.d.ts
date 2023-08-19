export declare const resolvers: {
    Query: {
        books: (parent: any, args: import("../type").BookProps, { db, models }: import("../type").Context) => Promise<any[]>;
        oneBook: (parent: any, args: import("../type").BookProps, { db, models }: import("../type").Context) => Promise<any>;
    };
    Mutation: {
        addBook: (parent: any, args: import("../type").BookProps, { db, models }: import("../type").Context) => Promise<any>;
        deleteBook: (parent: any, args: import("../type").BookProps, { db, models }: import("../type").Context) => Promise<boolean>;
        updateBook: (parent: any, args: import("../type").BookProps, { db, models }: import("../type").Context) => Promise<any>;
    };
};
