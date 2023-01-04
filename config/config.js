require("dotenv").config()

module.exports = {
    development: {
        username: process.env.db_username || "root",
        password: process.env.db_password || null,
        database: process.env.db_database || "voting_platform",
        host: process.env.db_host || "127.0.0.1",
        dialect: "mysql",
        port: process.env.db_port,
    },
    test: {
        logging: false,
        username: process.env.db_username || "root",
        password: process.env.db_password || null,
        database: process.env.db_database || "database_production",
        host: process.env.db_host || "127.0.0.1",
        dialect: "mysql",
        port: process.env.db_port,
    },
    production: {
        logging: false,
        username: process.env.db_username || "root",
        password: process.env.db_password || null,
        database: process.env.db_database || "database_production",
        host: process.env.db_host || "127.0.0.1",
        dialect: "mysql",
        port: process.env.db_port,
    },
}
