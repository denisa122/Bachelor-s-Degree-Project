require("dotenv").config();
const fs = require("fs");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const seedDatabase = async () => {
  try {
    const seedSQL = fs.readFileSync("./db/postgresql/seed_data.sql", "utf8");
    await pool.query(seedSQL);
    console.log("Data seeded successfully");
  } catch (error) {
    console.error("Error seeding data", error);
  } finally {
    pool.end();
  }
};

seedDatabase();
