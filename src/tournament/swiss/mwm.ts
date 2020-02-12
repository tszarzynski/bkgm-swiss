import mwm from 'edmonds-blossom';
import { ISBPairing, ISBPlayer, ISBGraphEdge } from '../../types';

export const transformMWMToPairings = (players: ISBPlayer[]) => (
  mwm: number[]
) =>
  mwm.reduce<{ pairs: ISBPairing[]; paired: number[] }>(
    (acc, node, index) => {
      const { pairs, paired } = acc;
      const pair = [
        players[index].ID,
        node !== -1 ? players[node].ID : -1,
      ] as ISBPairing;

      return pair.some(id => paired.indexOf(id) !== -1)
        ? acc
        : { pairs: [...pairs, pair], paired: [...paired, ...pair] };
    },

    { pairs: [], paired: [] }
  ).pairs;

/**
 * Calculate MWM for given graph
 * @param graph
 */
export const calcMWMForGraph = (graph: ISBGraphEdge[]) => mwm(graph);
