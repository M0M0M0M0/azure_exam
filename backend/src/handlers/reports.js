const { app } = require('@azure/functions');
const { reply, guard } = require('../shared/reply');
const { isUuid } = require('../shared/check');
const { playerAssetReport } = require('../data/reportStore');

app.http('getassetsbyplayer', {
  route: 'getassetsbyplayer',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: guard(async (req) => {
    const playerId = req.query.get('playerId');
    if (playerId && !isUuid(playerId)) return reply.invalid(['playerId must be a valid id']);

    return reply.ok(await playerAssetReport(playerId || null));
  }),
});
