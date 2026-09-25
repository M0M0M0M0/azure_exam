# Battle Game

Azure Functions (Node.js) + SQL Server + React.

## Chạy project

Database:

```bash
docker compose up -d
```

SQL Server: `localhost,1433`, user `sa`, password `Studio#Game2026`.

Backend (cần Azure Functions Core Tools v4):

```bash
cd backend
npm install
npm start
```

API: `http://localhost:7071/api`

Frontend:

```bash
cd frontend
npm install
npm start
```

Web: `http://localhost:3000`

## API

- `POST /api/registerplayer` - `{ playerName, fullName, age, level, email }`
- `POST /api/createasset` - `{ assetName, levelRequire }`
- `GET /api/getassetsbyplayer` - `?playerId=` (không bắt buộc)
- `POST /api/assignasset` - `{ playerId, assetId }`
- `GET /api/getplayers`
- `GET /api/getassets`
