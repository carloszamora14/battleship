const expect = require('chai').expect;
const { checkForShip } = require('../game_logic/ship');

describe('checkForShip', function () {
  it('should correctly report no ship at a given player coordinate', function () {
    const player = {
      ships: [
        { locations: [[0, 0]] }
      ]
    };

    expect(checkForShip(player, [9, 9])).to.be.false;
  });
});