/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * This is a component of the solution the the Bakery Packing problem
 *
 */
class Bakery {

	constructor(name = {}, product = {}) {
		this.internalProperties = {};
		this.name = name;
		this.product = product;
	}

	/**
	 * @param {string[]} inputStream - newline separated items or array
	 * @return {{data: Array, errors: Array}}
	 */
	main(inputStream = []) {

		if (typeof inputStream === "string") { inputStream = inputStream.split("\n"); }

		let result = { "payload": [], "error": [] };

		if (!Array.isArray(inputStream)) {
			result.error.push(new Error(`input stream invalid`)); return result;
		}

		for (let inputLine of inputStream) {
			let itemResult = this.processItem(inputLine);
			if (itemResult == null) {continue; }
			if (itemResult.error !== null) { result.error.push(itemResult.error); }
			if (itemResult.payload !== null) { result.payload.push(itemResult.payload); }
		}

		return result;
	}

	/**
	 *
	 * @param {string} srcItem -
	 * @return {{}}
	 */
	processItem(srcItem) {

		let item = this.validateItem(srcItem);
		if (item == null) { return null; }
		if ((item.name || "") === "Error") { return {"payload": null, "error": item}; }

		// construct result packet
		let result = {
			"originalItem": srcItem,
			"name": this.name[item.code],
			"code": item.code,
			"requestedCount": parseInt(item.numberOfItems),
			"canBePacked": false,
			"totalCost": 0.0,
			"breakdown": []
		};

		// pack sizes greater than the item.numberOfItems will not lead to a solution, convert to integer, and sort descending
		let packSizes = Object.keys(this.product[item.code])
			.filter(packSize => { return parseInt(packSize) <= item.numberOfItems })
			.map(packSize => { return parseInt(packSize) })
			.sort( (a, b) => { return b-a });

		let calc = this.calc(item.code, item.numberOfItems, packSizes, result.breakdown);
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
	 * Recursive function to pack organisation for the requested number of Items
	 * @param {string} code
	 * @param {number} numberOfItems
	 * @param {number[]} packSizes
	 * @param {{}[]} results
	 * @return {{}}
	 */
	calc(code, numberOfItems, packSizes, results = []) {

		for (let packSize of packSizes) {

			let wholePacks = Math.floor(numberOfItems / packSize);  // do the division and remainder
			let remainder = numberOfItems % packSize;

			let ret = { "status": true, "count": wholePacks, "packSize": packSize };
			if (remainder === 0) { results.push(ret); return ret; } // if we have a remainder of zero that means the pack size is a multiple of numberOfItems

			// the remainder becomes the new requestedCount, and we need to create a new  packSizes array where the only sizes we want those equal to or less than remainder
			let newPackSizes = packSizes.filter( packSize => { return packSize <= remainder; } );

			let subValue = this.calc(code, remainder, newPackSizes, results); // --->> recursive call <<----
			if (subValue.status) {
				results.push(ret); return ret; // if the child recursive call worked, then this one worked
			}
		}

		return { "status": false};
	}

	/**
	 *
	 * @param {string} srcItem
	 * @return {{} | Error | null}
	 */
	validateItem(srcItem) {

		srcItem = srcItem.trim(); // clean + sanitize string
		if (srcItem === "") {
			return null; // we don't care about empty lines ? maybe we doo and we should return line number?
		}

		// validate input
		if (srcItem.indexOf(" ") === -1) {
			return new Error(`E001,invalid item line: ${srcItem}`);
		}

		// extract requestCount code
		let [numberOfItems, code] = srcItem.split(" ");
		if (numberOfItems == null || code == null) {
			return new Error(`E002,input string is invalid: ${srcItem}`);
		}
		code = code.trim();

		// get handle to product pack info
		if (!(code in this.product)) {
			return new Error(`E003,Unable to find product pack info for productCode:${code}, original: ${srcItem}`);
		}

		if (!(code in this.name)) {
			return new Error(`E004,Unable to find product name for productCode:${code}, original: ${srcItem}`);
		}

		numberOfItems = parseInt(numberOfItems);
		if (isNaN(numberOfItems)) {
			return new Error(`E005,invalid number of items for productCode:${code}, original: ${srcItem}`);
		}

		return {"code": code, "numberOfItems": numberOfItems}
	}


	// here I have created my own getters and setters accessors, to mimic public and private properties, as ES6 does not support it.
	/**
	 * get a property
	 * @param {string} name
	 * @param {*} defaultValue
	 * @returns {*}
	 */
	getProperty(name, defaultValue = null) {
		return (name in this.internalProperties) ? this.internalProperties[name] : defaultValue;
	}

	/**
	 * Set a Property value
	 * @param {string} name
	 * @param {*} value
	 * @returns {string}
	 */
	setProperty(name, value = null) {
		this.internalProperties[name] = value;
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

}


class BakeryView {

	constructor( ) {

	}

}

