function checkForShip(player, coordinates) {
  const ships = player.ships;
  let shipPresent = false;

  ships.forEach(function (ship) {
    shipPresent ||= ship.locations.some(function (loc) {
      return loc[0] === coordinates[0] && loc[1] === coordinates[1];
    });
  });

  return shipPresent;
}

module.exports = {
  checkForShip
};