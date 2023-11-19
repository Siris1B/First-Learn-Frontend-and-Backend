import pg from "pg";

const db = new pg.Pool({
    user: "postgres",
    password: '123qwe123qwe',
    host: 'localhost',
    port: 9999,
    database: 'languages'
});

export default db;
