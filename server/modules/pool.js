const pg = require('pg');

let pool = new pg.Pool({
    database: 'koalas',
    host: 'localhost',
    port: 5432,
});

module.exports = pool;