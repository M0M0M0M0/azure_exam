const { mssql, callProc } = require('../shared/db');

const toPlayer = (row) => ({
  id: row.PlayerId,
  playerName: row.PlayerName,
  fullName: row.FullName,
  age: row.Age,
  level: row.Level,
  email: row.Email,
});

const insertPlayer = async ({ playerName, fullName, age, level, email }) => {
  const [row] = await callProc('dbo.Player_Insert', {
    playerName: [mssql.NVarChar(64), playerName],
    fullName: [mssql.NVarChar(128), fullName],
    age: [mssql.NVarChar(10), age],
    level: [mssql.Int, level],
    email: [mssql.NVarChar(64), email],
  });
  return toPlayer(row);
};

const listPlayers = async () => (await callProc('dbo.Player_List')).map(toPlayer);

module.exports = { insertPlayer, listPlayers };
