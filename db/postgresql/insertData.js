require ('dotenv').config();
const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRESQL_DB_USER,
    host: process.env.POSTGRESQL_DB_HOST,
    database: process.env.POSTGRESQL_DB_NAME,
    password: process.env.POSTGRESQL_DB_PASSWORD,
    port: process.env.POSTGRESQL_DB_PORT
});

const seedDatabase = async () => {
    try {
        const seedSQL = fs.readFileSync('./db/postgresql/seed_data.sql', 'utf8');
        await pool.query(seedSQL);
        console.log('Data seeded successfully');
    } catch (error) {
        console.error('Error seeding data', error);
    } finally {
        pool.end();
    }
};

seedDatabase();