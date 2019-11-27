# bkgm-swiss

Swiss Pairing implementation for Backgammon tournaments. 
Work in progress, but already generates promising results.
I'm planning to turn it into a proper module once all tests are in place.

Currently it's possible to see tournament simulation by running ```node build/tournament.js```.

Weight calculation inspired by https://github.com/bakert/swiss.
See http://bluebones.net/2018/04/swiss-pairing-algorithm/ for details.

Based on https://github.com/mattkrick/EdmondsBlossom for maximum weighted matching algorithm.

Ranking is created based on:
1. Matches won
2. Games won
3. OMV


