/**
 * Function builder to return promise, callback or observable
 * @param {(Promise<Any>)} fn
 * @returns {{asPromise(): Promise<Any>, asCallback(*): void}}
 */
module.exports.FunctionBuilder = function(fn) {
	return {

		/**
		 * Return result as promise
		 * @returns {Promise<Any>}
		 */
		asPromise() {
			return fn;
		},

		/**
		 * Function builder to return promise, callback or observable
		 * @param {Function} callback
		 * @returns {void}
		 */
		asCallback(callback) {
			fn.then((result) => callback(null, result), (err) => callback(err));
		},
	};
};
