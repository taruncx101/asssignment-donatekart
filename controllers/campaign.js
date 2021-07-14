const axios = require("axios");

/**
 * return all campigns by desecnding order of totalAmount
 */
exports.getCampaigns = async (req, res, next) => {
  try {
  	const {
  		data
	  } = await axios.get('https://testapi.donatekart.com/api/campaign');
	// we have to sort data by totalAmount
	// we can also use lodash
	data.sort((a, b) => b.totalAmount - a.totalAmount);
	const newData = data.map(o => {
		return {
			title: o.title,
			totalAmount: o.totalAmount,
			backersCount: o.backersCount,
			endDate: o.endDate
		}
	});
  	res.json(newData);
  } catch (err) {
  	if (!err.statusCode) {
  		err.statusCode = 500;
  	}
  	next(err);
  }
}
/**
 * return active campigns
 */
exports.getActiveCampaigns = async (req, res, next) => {
	try {
		const {
			data
		} = await axios.get('https://testapi.donatekart.com/api/campaign');
		const date = new Date();
		date.setMonth(date.getMonth() - 1);
		const today = new Date();
		// we have to filter data by created date
		// we can also use moment and lodash
		const newData = data.filter(o => {
			const created = new Date(o.created);
			const endDate = new Date(o.endDate);
			return created >= date && endDate >= today
		});
		res.json(newData);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}

/**
 * return closed campigns
 */
exports.getClosedCampaigns = async (req, res, next) => {
	try {
		const {
			data
		} = await axios.get('https://testapi.donatekart.com/api/campaign');
		const today = new Date();
		// we have to filter data by end date and today
		// we can also use moment and lodash
		const newData = data.filter(o => {
			const endDate = new Date(o.endDate);
			return endDate > today || o.procuredAmount >= o.totalAmount;
		});
		res.json(newData);
	} catch (err) {
		if (!err.statusCode) {
			err.statusCode = 500;
		}
		next(err);
	}
}
