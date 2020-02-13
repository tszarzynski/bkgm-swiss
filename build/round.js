"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v1_1 = __importDefault(require("uuid/v1"));
const consts_1 = require("./consts");
exports.makeMatch = (roundID, pairing, ID = v1_1.default()) => {
    const hasBye = pairing.includes(consts_1.BYE_ID);
    return {
        roundID,
        ID,
        pairing,
        result: [0, hasBye ? -1 : 0],
        hasBye
    };
};
exports.makeRound = (pairings, roundID) => pairings.map(pairing => exports.makeMatch(roundID, pairing));
//# sourceMappingURL=round.js.map