const { app } = require('@azure/functions');
const { reply, guard, readBody } = require('../shared/reply');
const { rules, check } = require('../shared/check');
const { insertAsset, listAssets, giveAssetToPlayer } = require('../data/assetStore');

const assetShape = {
  assetName: [rules.text(64)],
  levelRequire: [rules.int(0)],
};

const ownershipShape = {
  playerId: [rules.uuid()],
  assetId: [rules.uuid()],
};

app.http('createasset', {
  route: 'createasset',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: guard(async (req) => {
    const body = await readBody(req);
    if (!body) return reply.invalid(['Body must be a JSON object']);

    const problems = check(assetShape, body);
    if (problems.length) return reply.invalid(problems);

    const asset = await insertAsset({ assetName: body.assetName.trim(), levelRequire: body.levelRequire });
    return reply.created(asset);
  }),
});

app.http('getassets', {
  route: 'getassets',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: guard(async () => reply.ok(await listAssets())),
});

app.http('assignasset', {
  route: 'assignasset',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: guard(async (req) => {
    const body = await readBody(req);
    if (!body) return reply.invalid(['Body must be a JSON object']);

    const problems = check(ownershipShape, body);
    if (problems.length) return reply.invalid(problems);

    return reply.created(await giveAssetToPlayer(body));
  }),
});
