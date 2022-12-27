require("dotenv").config();

module.exports = {
    development: {
		username: process.env.DBUSERNAME || "root",
		password: process.env.DBPASS || null,
		database: "voting_platform",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	test: {
        logging: false,
		username: process.env.DBUSERNAME || "root",
		password: process.env.DBPASS || null,
		database: "database_test",
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
        logging: false,
		username: process.env.DBUSERNAME || "root",
		password: process.env.DBPASS || null,
		database: "database_production",
		host: "127.0.0.1",
		dialect: "mysql",
	},
};
