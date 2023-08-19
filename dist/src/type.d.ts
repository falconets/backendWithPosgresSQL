import { Pool } from "pg";
import models from "./models";
export interface BookProps {
    title?: string;
    author?: string;
    store?: string;
    id?: string;
}
export type Book = {
    parent: any;
    args: BookProps;
};
export type Context = {
    db: Pool;
    models: typeof models;
};
