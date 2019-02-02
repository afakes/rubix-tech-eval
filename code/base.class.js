/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * This is a component of the solution the the Bakery Packing problem
 *
 */
class base {

	constructor() {
		this.internalProperties = {};
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

	// template for getter and setter
	/** @returns {} */
	get description() {
	    return this.getProperty('description', false);
	}

	/** @param {} value */
	set description(value) {
	    this.setProperty('description', value);
	}

}