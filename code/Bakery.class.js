/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * Bakery Packing problem component
 */
class Bakery extends base {

	constructor(name = {}, product = {}) {
		super();
		this.name = name;
		this.product = product;
	}

	/**
	 * @param {string[]} inputStream - newline separated items or array
	 * @return {Boolean}
	 */
	main(inputStream = []) {

		this.inputStream = inputStream;
		this.error = [];
		this.payload = [];

		if (typeof inputStream === "string") { inputStream = inputStream.split("\n"); }
		if (!Array.isArray(inputStream)) {
			this.error.push(new Error(`input stream invalid`)); return false;
		}

		for (let inputLine of inputStream) {
			let itemResult = this.processItem(inputLine);
			if (itemResult == null) {continue; }
			if (itemResult.error !== null) { this.error.push(itemResult.error); }
			if (itemResult.payload !== null) {
				this.payload.push(itemResult.payload);
			}
		}

		return (this.error.length === 0);
	}

	/**
	 *
	 * @param {string} srcItem -
	 * @return {{}}
	 */
	processItem(srcItem) {

		// validate input
		let item = this.validateItem(srcItem);
		if (item == null) { return null; }
		if ((item.name || "") === "Error") { return {"payload": null, "error": item}; }

		// construct result packet
		let result = {
			"originalItem":  srcItem,
			"name":          this.name[item.code],
			"code":          item.code,
			"numberOfItems": parseInt(item.numberOfItems),
			"canBePacked":   false,
			"totalCost":     0.0,
			"breakdown":     []
		};

		// pack sizes greater than the item.numberOfItems will not lead to a solution, convert to integer, and sort descending
		let packSizes = Object.keys(this.product[item.code])
			.map(packSize => { return parseInt(packSize) })
			.filter(packSize => { return packSize <= item.numberOfItems })
			.sort( (a, b) => { return b-a });

		let calc = this.calc(item.code, item.numberOfItems, packSizes, result.breakdown); // find the solution
		result.canBePacked = calc.status;

		if (result.canBePacked) {
			for ( let lineItemObject of result.breakdown ) {
				lineItemObject.packCost = this.product[item.code][lineItemObject.packSize];
				lineItemObject.lineItemCost = (lineItemObject.packCost * lineItemObject.count);
				result.totalCost += lineItemObject.lineItemCost;
			}
		}

		return {"payload": result, "error": null};
	}

	/**
	 * Recursive function for pack organisation for the requested number of Items
	 * @param {string} code
	 * @param {number} numberOfItems
	 * @param {number[]} packSizes
	 * @param {{}[]} results
	 * @return {{}}
	 */
	calc(code = null, numberOfItems = null, packSizes = [], results = []) {

		for (let packSize of packSizes) {

			let wholePacks = Math.floor(numberOfItems / packSize);  // do the division and remainder
			let remainder = numberOfItems % packSize;

			let ret = { "status": true, "count": wholePacks, "packSize": packSize };
			if (remainder === 0) { results.push(ret); return ret; } // if we have a remainder of zero that means the pack size is a multiple of numberOfItems

			// the remainder becomes the new numberOfItems, a new packSizes array where the
			// only sizes are those equal to or less than remainder
			let newPackSizes = packSizes.filter( packSize => { return packSize <= remainder; } );

			let subValue = this.calc(code, remainder, newPackSizes, results); // --->> recursive call <<----
			if (subValue.status) {
				results.push(ret); return ret; // if the child recursive call worked, then this one worked
			}
		}

		return { "status": false}; // looped through all pack sizes and could not find a whole number solution
	}

	/**
	 *
	 * @param {string} input
	 * @return {{} | Error | null}
	 */
	validateItem(input = null) {

		if (input === null) {
			return null;
		}

		input = input.trim(); // clean + sanitize string
		if (input === "") {
			return null; // we don't care about empty lines ? maybe we doo and we should return line number?
		}

		// validate input
		if (input.indexOf(" ") === -1) {
			return new Error(`E001,invalid item line: ${input}`);
		}

		// extract requestCount code
		let [numberOfItems, code] = input.split(" ");
		if (numberOfItems == null || code == null) {
			return new Error(`E002,input string is invalid: ${input}`);
		}
		code = code.trim();

		// get handle to product pack info
		if (!(code in this.product)) {
			return new Error(`E003,Unable to find product pack info for productCode:${code}, original: ${input}`);
		}

		if (!(code in this.name)) {
			return new Error(`E004,Unable to find product name for productCode:${code}, original: ${input}`);
		}

		numberOfItems = parseInt(numberOfItems);
		if (isNaN(numberOfItems)) {
			return new Error(`E005,invalid number of items for productCode:${code}, original: ${input}`);
		}

		return {"code": code, "numberOfItems": numberOfItems}
	}

	/** @returns {{}} */
	get name() {
		return this.getProperty('name', {});
	}

	/** @param {{}} value */
	set name(value) {
		this.setProperty('name', value);
	}

	/** @returns {{}} */
	get product() {
		return this.getProperty('product', {});
	}

	/** @param {{}} value */
	set product(value) {
		this.setProperty('product', value);
	}


	/** @returns {{}[]} */
	get payload() {
	    return this.getProperty('payload', []);
	}
	
	/** @param {{}[]} value */
	set payload(value) {
	    this.setProperty('payload', value);
	}

	/** @returns {Error[]} */
	get error() {
	    return this.getProperty('error', []);
	}

	/** @param {Error[]} value */
	set error(value) {
	    this.setProperty('error', value);
	}

	/** @returns {string[] | string} */
	get inputStream() {
	    return this.getProperty('inputStream', false);
	}

	/** @param {string[] | string} value */
	set inputStream(value) {
	    this.setProperty('inputStream', value);
	}

}

