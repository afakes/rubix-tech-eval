/**
 * Created by Adam Fakes <adam@datavi.co> on 31/01/2019.
 * Bakery Packing problem component
 */
class BakeryView  extends base {

	/**
	 * @param {Bakery} src
	 */
	constructor(src) {
		super();
		this.src = src;

		this.elements = {
			"input": null,
			"output": null,
			"error": null
		};

	}

	/** @returns {Bakery} */
	get src() {

	    return this.getProperty('src', null);
	}

	/** @param {Bakery} value */
	set src(value) {
	    this.setProperty('src', value);
	}

	// ui element ID's

	/** @returns {{}} */
	configureElements(input = null, output = null, error = null) {
		if (input  != null) { this.elements.input  = document.getElementById(input);  }
		if (output != null) { this.elements.output = document.getElementById(output); }
		if (error  != null) { this.elements.error  = document.getElementById(error);  }
	}

	render() {
		if (this.src == null) { return; }

		this.input();
		this.payload();
		this.error();

	}

	input() {
		if (this.elements.input === null) { return; }
		this.elements.input.innerText = JSON.stringify(this.src.inputStream || "" , null, 2);
	}

	/**
	 * Render the payload of the Bakery Object
	 */
	payload() {
		if (this.elements.output === null) { return; }

		for (let outputs of this.src.payload || [] ) {
			this.elements.output.appendChild(this.toHTML(this.formatLineItem(outputs)));
		}
	}

	/**
	 * configured formatter
	 * @return {Intl.NumberFormat}
	 */
	get numberFormatter() {
		return new Intl.NumberFormat('en-AU', { style: 'decimal', minimumFractionDigits: 2});
	}

	/**
	 * for mat line-item for output
	 * @param {{}} singlePayload
	 * @return {DocumentFragment}
	 */
	formatLineItem(singlePayload) {

		let formatter = this.numberFormatter;

		let str;

		let lineItems = singlePayload.breakdown || [];

		if (lineItems.length === 0) {
			str = `Unable to find a solution for product ${singlePayload.code} with ${singlePayload.numberOfItems} items, using current product pack sizes`;
		} else {
			// add single payload header, i.e. the line item
			str = `${singlePayload.numberOfItems}&nbsp;${singlePayload.code}&nbsp;$${formatter.format(singlePayload.totalCost)}`;

			for (let subItem of lineItems) {
				str += `\n&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${subItem.count}&nbsp;x&nbsp;${subItem.packSize}&nbsp;$${formatter.format(subItem.packCost)}`;
			}
		}

		return `<pre>${str}</pre>`;



	}

	error() {
		if (this.elements.error === null) { return; }

		let str = `<ul>`;
		for (let error of this.src.error || []) { str += `<li>${error.message || ""}</li>\n`; }
		str += `<ul>`;

		this.elements.error.appendChild(this.toHTML(str));
	}



	/**
	 * convert string into HTML appendable object (HTML Fragment)
	 * @param {string} string
	 * @return {DocumentFragment}
	 */
	toHTML(string = "") {
		return document.createRange().createContextualFragment(string);
	}

	/** @returns {{}} */
	get elements() {
	    return this.getProperty('elements', {"input": null, "output": null, "error": null });
	}

	/** @param {{}} value */
	set elements(value) {
	    this.setProperty('elements', value);
	}

}

