import { Book, Context } from '../type';
export declare const Mutation: {
    addBook: (parent: Book['parent'], args: Book['args'], { db, models }: Context) => Promise<any>;
    deleteBook: (parent: Book['parent'], args: Book['args'], { db, models }: Context) => Promise<boolean>;
    updateBook: (parent: Book['parent'], args: Book['args'], { db, models }: Context) => Promise<any>;
};
