class Issuer {
    hive = require("@hiveio/hive-js");

    /** Nodes to use  */
    nodes;
    /** Errors required to switch */
    errorsToSwitch;
    /** Current error count */
    errorCount = 0;

    /** Username of issuing account */
    issuingUserName;
    /** Private Active Key of issuing account */
    issuingPrivateActiveKey;

    /** Initialized */
    init = false;

    /**
     * Constructor
     * @param {Array<String>} nodesToUse Array of nodes to use
     * @param {Number} errorCountToSwitch Integer of how many errors to switch after
     * @param {String} username Username of issuing account
     * @param {String} privateActiveKey Private Active Key of issuing account
     * @returns {boolean} If initialized
     * @throws {Error} Throws error if any error
     */
    constructor(nodesToUse, errorCountToSwitch, username, privateActiveKey) {
        if (typeof nodesToUse !== "object" || nodesToUse.length === 0) {
            throw new Error("nodesToUse must be an array of nodes.");
        }
        if (typeof errorCountToSwitch !== "number" || Math.abs(errorCountToSwitch) !== errorCountToSwitch || !Number.isInteger(errorCountToSwitch) || errorCountToSwitch === 0) {
            throw new Error("errorCountToSwitch should be a positive integer.");
        }
        if (username === null || username === "") {
            throw new Error("username is invalid.");
        }
        if (privateActiveKey === null || privateActiveKey === "") {
            throw new Error("privateActiveKey is invalid.");
        }
        this.nodes = nodesToUse;
        this.errorsToSwitch = errorCountToSwitch;
        this.issuingUserName = username;
        this.issuingPrivateActiveKey = privateActiveKey;
        this.init = true;
        this.switchNode();
        return true;
    }

    /**
     * Throws error is this hasn't been initialized
     * @throws {Error} Not initialized
     */
    checkInit() {
        if (!this.init) {
            throw new Error("Hasn't been initialized yet, please initialize first by calling initialize.");
        }
    }

    /**
     * Adds to error count, switches node upon reaching errorsToSwitch
     */
    nodeError() {
        this.errorCount++;
        if (this.errorCount === this.errorsToSwitch) {
            this.switchNode();
        }
    }

    /**
     * Switches node and resets error count to 0
     */
    switchNode() {
        this.checkInit();
        this.errorCount = 0;
        let currentNode = this.nodes.shift();
        this.hive.api.setOptions({url: currentNode});
        this.nodes.push(currentNode);
    }

    /**
     * Issues NFTs
     * @param {Array<NFTInstance>} instances Array of NFTInstances
     * @throws {Error} Error
     */
    issueNFTs(instances) {
        this.checkInit();
        if (instances.length === 0) {
            throw new Error("instances cannot be empty.");
        }
        let instancesFormatted = [];
        for (let i in instances) {
            let nft = instances[i];
            try {
                instancesFormatted.push(nft.getObjectForm());
            } catch(err){
                throw(err);
            }
            
        }
        let sendJSON = {
            "contractName": "nft",
            "contractAction": "issueMultiple",
            "contractPayload": {"instances": instancesFormatted}
        };
        this.hive.broadcast.customJson(this.issuingPrivateActiveKey, [this.issuingUserName], null, "ssc-mainnet-hive", JSON.stringify(sendJSON), (err, result) => {
            if (err) {
                this.nodeError();
                throw new Error(err);
            }
            return result;
        })
    }
}


module.exports = Issuer;