const UUID_REGEX = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;
const MAIL_REGEX = /^\S+@\S+\.\S+$/;

const rules = {
  text: (max) => (v) => {
    if (v === undefined || v === null || String(v).trim() === '') return 'is required';
    if (String(v).trim().length > max) return `must be at most ${max} characters`;
    return null;
  },
  int: (min) => (v) => (Number.isInteger(v) && v >= min ? null : `must be a whole number >= ${min}`),
  mail: () => (v) => (typeof v === 'string' && MAIL_REGEX.test(v.trim()) ? null : 'must be a valid email'),
  uuid: () => (v) => (typeof v === 'string' && UUID_REGEX.test(v) ? null : 'must be a valid id'),
};

const check = (shape, input) =>
  Object.entries(shape).flatMap(([field, tests]) =>
    tests.map((test) => test(input[field])).filter(Boolean).slice(0, 1).map((msg) => `${field} ${msg}`),
  );

const isUuid = (v) => UUID_REGEX.test(v);

module.exports = { rules, check, isUuid };
