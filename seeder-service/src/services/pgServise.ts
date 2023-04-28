import sql from "../db/connect";

export default async () => {
  await sql`CREATE TABLE IF NOT EXISTS public.data (
                id serial PRIMARY KEY,
                todos_count integer
            )`;

  console.log('data table created');
  
  await sql `CREATE TABLE public.todos (
                id serial PRIMARY KEY,
                title character varying(255) NOT NULL,
                todo_id integer NOT NULL,
                user_id integer,
                completed boolean NOT NULL
            );`;

  console.log('todos table created');

  await sql `CREATE TABLE IF NOT EXISTS public.users (
                id serial PRIMARY KEY,
                username character varying(255) COLLATE pg_catalog."default",
                password character varying(255) COLLATE pg_catalog."default"
            )`;

  console.log('users table created');
  
  
  const defaultCount = await sql `SELECT * FROM public.data`;
  if (!defaultCount.count) {
    await sql`INSERT INTO public.data (todos_count) VALUES (0) returning *`;
    console.log('data (todos_count) VALUES (0)');
  }
  
};