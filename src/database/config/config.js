
const dotenv=require("dotenv")
dotenv.config();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DB_PORT, DATABASE_URL, DB_NAME_TEST } = process.env;
module.exports = {
	development: {
		username:"postgres" ,
		password: "password",
		database: "EMSDb",
		host: "localhost",
		dialect: "postgres",
		// dialectOptions: {
		// 	"ssl": {
		// 		"require": true,
		// 		"rejectUnauthorized": false
		// 	}
		// },
		port: 5432,
	},
	test: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME_TEST,
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
	},
	production: {
		username: DB_USER,
		password: DB_PASSWORD,
		database: DB_NAME,
		host: DB_HOST,
		dialect: 'postgres',
		port: DB_PORT,
	},
};