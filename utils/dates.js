var moment = require("moment-timezone");

/**
 * Utility functions for working with dates, which hide timezone details...
 * @type {Object}
 */
module.exports = {

	/**
	 * Timezone string maintained in our environment configuration file.
	 * @return {string} timezone
	 */
	timezone: function() {
		return process.env.TIMEZONE;
	},

	/**
	 * Get current moment timestamp, using our environment timezone.
	 * @return {moment} moment object
	 */
	now: function() {
		return moment.tz(module.exports.timezone());
	},

	/**
	 * Convert string date to UTC moment with correct timezone
	 * @param  {string} date string value of date to be converted
	 * @return {moment} UTC moment representing given date.
	 */
	toMoment: function(date) {
		return moment.tz(date, "MM/DD/YYYY", module.exports.timezone()).utc();
	},

	/**
	 * Take separate date and time and combine them into single moment object
	 * 
	 * @param  {string} date date in format UTC or DD-MMM-YY
	 * @param  {string} time time in format "hh:mm A"
	 * @return {moment} moment combine separate date and time into a single date and time moment object.
	 */
	fromDateAndTime: function(date, time) {
		return moment.tz(moment(date).format("MM/DD/YYYY") + " " + time, "MM/DD/YYYY hh:mm A", module.exports.timezone());
	},

	/**
	 * Determine if a date is passed its allowed window of days.
	 * @return {Boolean} true means it has been sitting too long.
	 */
	hasSatTooLong: function(checkdate) {
		return module.exports.now().diff(moment(checkdate), 'days') > process.env.QUEUE_TTL_DAYS;
	}

};