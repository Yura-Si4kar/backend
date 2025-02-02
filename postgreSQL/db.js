const Pool = require('pg');
const pool = new Pool({
    user: 'postgres'
});

module.exports = pool;