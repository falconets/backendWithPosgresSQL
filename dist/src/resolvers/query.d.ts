import { Book, Context } from '../type';
export declare const Query: {
    books: (parent: Book['parent'], args: Book['args'], { db, models }: Context) => Promise<any[]>;
    oneBook: (parent: Book['parent'], args: Book['args'], { db, models }: Context) => Promise<any>;
};
