const mssql = require('mssql');

let connecting = null;

const connect = () => {
  if (!connecting) {
    connecting = mssql.connect(process.env.DB_CONNECTION).catch((err) => {
      connecting = null;
      throw err;
    });
  }
  return connecting;
};

const callProc = async (proc, inputs = {}) => {
  const pool = await connect();
  const req = pool.request();
  for (const [key, [sqlType, val]] of Object.entries(inputs)) {
    req.input(key, sqlType, val);
  }
  const { recordset } = await req.execute(proc);
  return recordset ?? [];
};

module.exports = { mssql, callProc };
