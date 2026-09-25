const { mssql, callProc } = require('../shared/db');

const toAsset = (row) => ({
  id: row.AssetId,
  assetName: row.AssetName,
  levelRequire: row.LevelRequire,
});

const insertAsset = async ({ assetName, levelRequire }) => {
  const [row] = await callProc('dbo.Asset_Insert', {
    assetName: [mssql.NVarChar(64), assetName],
    levelRequire: [mssql.Int, levelRequire],
  });
  return toAsset(row);
};

const listAssets = async () => (await callProc('dbo.Asset_List')).map(toAsset);

const giveAssetToPlayer = async ({ playerId, assetId }) => {
  const [row] = await callProc('dbo.PlayerAsset_Insert', {
    playerId: [mssql.UniqueIdentifier, playerId],
    assetId: [mssql.UniqueIdentifier, assetId],
  });
  return { playerId: row.PlayerId, assetId: row.AssetId };
};

module.exports = { insertAsset, listAssets, giveAssetToPlayer };
