const unirest = require('unirest');

const request = (method, uri, headers = null, body = null) => new Promise((resolve, reject) => unirest(
	method,
	uri,
	headers,
	body,
	(err, response) => {
		const filtered_response = (obj) => {
			let result = {};
			if (obj && obj.body) {
				const responseBody = obj.body;
				if (typeof responseBody === 'object') {
					result = responseBody;
				} else {
					try {
						result = JSON.parse(responseBody);
					} catch (ignored) {
						result = {};
					}
				}
			}

			return result;
		};

		if (err) {
			reject(filtered_response(err));
		} else {
			resolve(filtered_response(response));
		}
	}));

module.exports = {

	/**
	 * Get actual metadata value
	 * @param {Boolean} metadata
	 * @returns {Number}
	 */
	getMetadataValue: (metadata) => metadata && typeof metadata === 'boolean' || typeof metadata === 'number' ? Number(metadata) : 0,

	/**
     * Get Full URL
     * @param {String} basepath
     * @param {String} uri
     * @param {Object} params
	 * @returns {String}
     */
	getURL: (basepath, uri, params = null) => {
		const url = new URL(basepath, uri);
		if (params) {
			Object.keys(params).forEach((v) => url.searchParams.append(v, params[v]));
		}

		return url.href;
	},

	/**
	 * Make GET Request
	 * @param {String} uri
	 * @returns {Object}
	 */
	getRequest: (uri) => request('GET', uri),

	/**
	 * Make POST Request
	 * @param {String} uri
	 * @param {Object} headers
	 * @param {Object} body
	 * @returns {Object}
	 */
	postRequest: (uri, headers = null, body = null) => request('POST', uri, headers, body),

	/**
	 * Make DELETE Request
	 * @param {String} uri
	 * @param {Object} headers
	 * @param {Object} body
	 * @returns {Object}
	 */
	deleteRequest: (uri, headers = null, body = null) => request('DELETE', uri, headers, body),

	/**
	 * Remove null or empty properties from object
	 * @param {Object} obj
	 * @returns {Object}
	 */
	filterObject: (obj) => {
		Object.keys(obj).forEach((key) => {
			if (!obj[key]) {
				delete obj[key];
			}
		});
		return obj;
	}

};
