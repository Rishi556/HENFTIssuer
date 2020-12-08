let Issuer = require("./Issuer.js");

let NODES = ["https://api.deathwing.me", "https://api.hive.blog"];
let ERROR_COUNT_TO_SWITCH = 5;
let USERNAME = "RISHI556";
let PRIVATE_ACTIVE_KEY = "5KYZJ";

let SYMBOL = "CITY";
let TO = "rishi556";
let FEE_SYMBOL = "BEE";
let PROPERTIES = {"x": "y"};

test("proper init to work", () => {
    expect(new Issuer(NODES, ERROR_COUNT_TO_SWITCH, USERNAME, PRIVATE_ACTIVE_KEY)).toBeTruthy();
});


test("throws on invalid init", () => {
    expect(() => {
        new Issuer([], ERROR_COUNT_TO_SWITCH, USERNAME, PRIVATE_ACTIVE_KEY);
    }).toThrow();

    expect(() => {
        new Issuer(NODES, -1, USERNAME, PRIVATE_ACTIVE_KEY);
    }).toThrow();

    expect(() => {
        new Issuer(NODES, ERROR_COUNT_TO_SWITCH, "", PRIVATE_ACTIVE_KEY);
    }).toThrow();

    expect(() => {
        new Issuer(NODES, ERROR_COUNT_TO_SWITCH, USERNAME, null);
    }).toThrow();
});
