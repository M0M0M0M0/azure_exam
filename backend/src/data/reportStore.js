const { mssql, callProc } = require('../shared/db');

const playerAssetReport = async (playerId = null) => {
  const rows = await callProc('dbo.Report_PlayerAssets', {
    playerId: [mssql.UniqueIdentifier, playerId],
  });
  return rows.map((row) => ({
    no: row.RowNo,
    playerName: row.PlayerName,
    level: row.Level,
    age: row.Age,
    assetName: row.AssetName,
  }));
};

module.exports = { playerAssetReport };
