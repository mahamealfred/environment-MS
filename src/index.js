import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import router from './routes/index';
import i18n from 'i18n-2';
import bodyParser from 'body-parser';
dotenv.config();

const app=express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

i18n.expressBind(app, {
	locales: [ 'en', 'fr' ]
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);


// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.json({
		errors: {
			message: err.message,
			error: {}
		}
	});
});
// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
	console.log(`Listening on port ${server.address().port}`);
});