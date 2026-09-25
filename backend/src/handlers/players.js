const { app } = require('@azure/functions');
const { reply, guard, readBody } = require('../shared/reply');
const { rules, check } = require('../shared/check');
const { insertPlayer, listPlayers } = require('../data/playerStore');

const playerShape = {
  playerName: [rules.text(64)],
  fullName: [rules.text(128)],
  age: [rules.text(10)],
  level: [rules.int(1)],
  email: [rules.text(64), rules.mail()],
};

app.http('registerplayer', {
  route: 'registerplayer',
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: guard(async (req) => {
    const body = await readBody(req);
    if (!body) return reply.invalid(['Body must be a JSON object']);

    const problems = check(playerShape, body);
    if (problems.length) return reply.invalid(problems);

    const player = await insertPlayer({
      playerName: body.playerName.trim(),
      fullName: body.fullName.trim(),
      age: String(body.age).trim(),
      level: body.level,
      email: body.email.trim(),
    });
    return reply.created(player);
  }),
});

app.http('getplayers', {
  route: 'getplayers',
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: guard(async () => reply.ok(await listPlayers())),
});
