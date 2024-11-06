// index.js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL connection settings
const pool = new Pool({
    user: 'postgres',        // default username
    host: 'db',              // matches the service name in docker-compose.yml
    database: 'NOTEBOOK',
    password: 'postgres',    // default password
    port: 5432,
});

// Test the database connection
app.get('/db-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.send(`Database connected: ${result.rows[0].now}`);
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection failed');
    }
});

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Docker with PostgreSQL!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
