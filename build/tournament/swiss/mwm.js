"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const edmonds_blossom_1 = __importDefault(require("edmonds-blossom"));
exports.transformMWMToPairings = (players) => (mwm) => mwm.reduce((acc, node, index) => {
    const { pairs, paired } = acc;
    const pair = [
        players[index].ID,
        node !== -1 ? players[node].ID : -1,
    ];
    return pair.some(id => paired.indexOf(id) !== -1)
        ? acc
        : { pairs: [...pairs, pair], paired: [...paired, ...pair] };
}, { pairs: [], paired: [] }).pairs;
/**
 * Calculate MWM for given graph
 * @param graph
 */
exports.calcMWMForGraph = (graph) => edmonds_blossom_1.default(graph);
//# sourceMappingURL=mwm.js.map