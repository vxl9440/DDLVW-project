import { createConnection } from 'mysql';

export function getConnection() {
     return createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "Qq1196726420!",
        database: "iste500"
    });
}

