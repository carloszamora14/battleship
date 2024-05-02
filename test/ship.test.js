const expect = require('chai').expect;
const { checkForShip, damageShip, fire } = require('../game_logic/ship');

describe('checkForShip', function () {
  let player;

  before(function () {
    player = {
      ships: [
        { locations: [[0, 0], [0, 1]] },
        { locations: [[1, 0], [1, 1]] },
        { locations: [[2, 0], [2, 1], [2, 2], [2, 3]] },
      ]
    };
  });

  it('should correctly report no ship at a given player coordinate', function () {
    expect(checkForShip(player, [9, 9])).to.be.null;
  });

  it('should correctly report a ship located at the given coordinate', function () {
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
  });

  it('should handle ships located at more than one coordinate', function () {
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
  });

  it('should handle checking multiple ships', function () {
    expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
    expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);

    expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
    expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);

    expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
  });
});

describe('damageShip', function () {
  it('should register damage on a given ship at a given location', function () {
    const ship = {
      locations: [[0, 0]],
      damage: []
    };

    damageShip(ship, [0, 0]);

    expect(ship.damage).to.not.be.empty;
    expect(ship.damage[0]).to.deep.equal([0, 0]);
  });
});

describe('fire', function () {
  let player;

  beforeEach(function () {
    player = {
      ships: [
        { locations: [[0, 0], [0, 1], [0, 2]], damage: [] },
        { locations: [[3, 3]], damage: [] },
      ]
    };
  });

  it('should not record damage on the given ship', function () {
    fire(player, [0, 9]);

    expect(player.ships[0].damage).to.be.empty;
  });

  it('should record damage on the given player\'s ship at a given coordinates', function () {
    fire(player, [0, 0]);

    expect(player.ships[0].damage).to.not.be.empty;
    expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
  });

  it('should handle multiple ships and register damage only on the ship at the given location', function () {
    fire(player, [0, 1]);

    expect(player.ships[0].damage).to.not.be.empty;
    expect(player.ships[0].damage[0]).to.deep.equal([0, 1]);
    expect(player.ships[1].damage).to.be.empty;
  });

  it('should correctly register multiple damages at a given location', function () {
    fire(player, [0, 1]);
    fire(player, [0, 2]);

    expect(player.ships[0].damage).to.not.be.empty;
    expect(player.ships[1].damage).to.be.empty;
    expect(player.ships[0].damage[0]).to.deep.equal([0, 1]);
    expect(player.ships[0].damage[1]).to.deep.equal([0, 2]);
  });
});