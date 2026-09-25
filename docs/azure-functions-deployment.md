# Deploy Azure Function

## Chuẩn bị

- Tài khoản Azure
- Node.js 20
- Azure Functions Core Tools v4: `npm i -g azure-functions-core-tools@4`
- Azure CLI

## 1. Tạo Resource Group

Azure Portal > Resource groups > Create. Đặt tên `studio-game-rg`, region `Southeast Asia`.

## 2. Tạo Azure SQL Database

1. Create a resource > SQL Database.
2. Database name: `BATTLEGAME`, tạo server mới với SQL authentication.
3. Networking: chọn Public endpoint, bật "Allow Azure services..." và "Add current client IP".
4. Tạo xong vào Query editor, chạy lần lượt `sql/01_schema.sql`, `sql/02_procedures.sql`, `sql/03_sample_data.sql` (bỏ dòng `USE [BATTLEGAME]; GO` ở đầu file).
5. Vào Connection strings, copy chuỗi ADO.NET.

## 3. Tạo Function App

Create a resource > Function App:

- Plan: Consumption
- Name: `studio-game-fn`
- Runtime: Node.js 20, OS: Linux
- Region: Southeast Asia

## 4. Cấu hình

Function App > Settings > Environment variables, thêm:

```
DB_CONNECTION=Server=tcp:<server>.database.windows.net,1433;Database=BATTLEGAME;User Id=<user>;Password=<password>;Encrypt=true
```

Function App > API > CORS, thêm domain của web (vd `http://localhost:3000`).

## 5. Deploy

```bash
az login
cd backend
npm install
func azure functionapp publish studio-game-fn
```

Hoặc dùng VS Code: extension Azure Functions > chuột phải Function App > Deploy to Function App.

## 6. Kiểm tra

```bash
curl https://studio-game-fn.azurewebsites.net/api/getassetsbyplayer
```

Để web gọi API trên Azure, sửa `frontend/.env`:

```
VITE_FUNCTIONS_URL=https://studio-game-fn.azurewebsites.net/api
```
