
class NFTInstance {

    #symbol;
    #to;
    #feeSymbol;
    #properties;

    get symbol() {
        return this.#symbol;
    }

    set symbol(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("symbol should be a non empty string.");
        }
        this.#symbol = value;
    }

    get to() {
        return this.#to;
    }

    set to(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("to should be a non empty string");
        }
        this.#to = value;
    }

    get feeSymbol() {
        return this.#feeSymbol;
    }

    set feeSymbol(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("feeSymbol should be a non empty string");
        }
        this.#feeSymbol = value;
    }

    get properties() {
        return this.#properties;
    }

    set properties(value) {
        if (typeof value !== "object") {
            throw new Error("properties should be an object");
        }
        this.#properties = value;
    }

    constructor(symbol, to, feeSymbol, properties) {
        this.symbol = symbol;
        this.to = to;
        this.feeSymbol = feeSymbol;
        this.properties = properties;
    }

    getObjectForm(){
        let formed = {}
        formed.symbol = this.#symbol;
        formed.to = this.#to;
        formed.feeSymbol = this.#feeSymbol;
        formed.properties = this.#properties;
        return formed;
    }
}

module.exports = NFTInstance;