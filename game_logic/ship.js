function checkForShip(player, coordinates) {
  const ships = player.ships;

  for (let i = 0; i < ships.length; i++) {
    const shipPresent = ships[i].locations.some(function (loc) {
      return loc[0] === coordinates[0] && loc[1] === coordinates[1];
    });

    if (shipPresent) {
      return ships[i];
    }
  }

  return null;
}

function damageShip(ship, coordinates) {
  ship.damage.push(coordinates);
}

function fire(player, coordinates) {
  const ship = checkForShip(player, coordinates);

  if (ship) {
    damageShip(ship, coordinates);
  }
}

module.exports = {
  checkForShip,
  damageShip,
  fire
};