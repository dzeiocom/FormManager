import FormManager from "./FormManager"

export default class FMInput {

	element: HTMLInputElement
	form: FormManager

	constructor(element: HTMLElement, form: FormManager) {
		this.element = element as HTMLInputElement
		this.form = form
		this.setToDefault()
	}

	/**
	 * Set the element Value
	 *
	 * @param {*} value
	 * @memberof FMInput
	 */
	setValue(value: any) {
		this.element.value = value
		this.element.setAttribute("value", value)
	}

	/**
	 * Get the element value
	 *
	 * @returns {*} the value
	 * @memberof FMInput
	 */
	getValue(): any {
		return this.formatValue(this.element.value)
	}

	formatValue(value: any): any {
		if (!isNaN(Number(value))) return Number(value)
		return value

	}

	getDefault(args: string): any {
		if (args.startsWith("run:")) {
			args = args.split("run:")[1]
			return eval(args)
		}
		return args
	}

	setToDefault() {
		if (this.element.hasAttribute("data-default")) {
			return this.setValue(this.getDefault(this.element.dataset.default))
		}
		return this.setValue("")
	}

	getName(): string {
		return this.element.getAttribute("name") == undefined ? this.element.dataset.name : this.element.getAttribute("name")
	}

	/**
	 * Verify if the element is correct
	 *
	 * @returns {boolean}
	 * @memberof FMInput
	 */
	verify(): boolean {
		let val: string = this.getValue()
		if(val == "" && this.element.hasAttribute("required")) {
			return false
		}
		if(this.element.dataset.regex !== undefined) {
			return new RegExp(this.element.dataset.regex, 'g').test(val as string)
		}
		return true
	}
}
