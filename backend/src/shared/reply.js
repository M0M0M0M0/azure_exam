const DUPLICATE_KEY = 2627;
const FK_CONFLICT = 547;

const send = (status, payload) => ({ status, jsonBody: payload });

const reply = {
  ok: (result) => send(200, { message: 'OK', result }),
  created: (result) => send(201, { message: 'Created', result }),
  invalid: (details) => send(400, { message: 'Validation failed', details }),
  conflict: (text) => send(409, { message: 'Conflict', details: [text] }),
  failure: () => send(500, { message: 'Server error', details: ['Something went wrong, please try again'] }),
};

const guard = (handler) => async (req, ctx) => {
  try {
    return await handler(req, ctx);
  } catch (err) {
    if (err?.number === DUPLICATE_KEY) return reply.conflict('This asset already belongs to the player');
    if (err?.number === FK_CONFLICT) return reply.invalid(['Player or asset not found']);
    ctx.error('Unhandled error', err);
    return reply.failure();
  }
};

const readBody = async (req) => {
  try {
    const body = await req.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
};

module.exports = { reply, guard, readBody };
