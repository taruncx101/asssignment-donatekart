const express = require('express');

const campaignRoutes = require('./routes/campaign');

const app = express();


//set up cors policies
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
})

app.use('/campaign', campaignRoutes);

/** error handling */
app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	const message = err.message;
	const errors = err.data || [];
	res.status(status).json({
		message,
		errors
	});
});

app.listen(8080);
