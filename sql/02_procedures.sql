USE [BATTLEGAME];
GO

CREATE OR ALTER PROC [dbo].[Player_Insert]
    @playerName nvarchar(64),
    @fullName   nvarchar(128),
    @age        nvarchar(10),
    @level      int,
    @email      nvarchar(64)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @inserted TABLE ([PlayerId] uniqueidentifier);

    INSERT INTO [dbo].[Player] ([PlayerName], [FullName], [Age], [Level], [Email])
    OUTPUT INSERTED.[PlayerId] INTO @inserted
    VALUES (@playerName, @fullName, @age, @level, @email);

    SELECT pl.[PlayerId], pl.[PlayerName], pl.[FullName], pl.[Age], pl.[Level], pl.[Email]
    FROM [dbo].[Player] pl
    JOIN @inserted i ON i.[PlayerId] = pl.[PlayerId];
END
GO

CREATE OR ALTER PROC [dbo].[Player_List]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [PlayerId], [PlayerName], [FullName], [Age], [Level], [Email]
    FROM [dbo].[Player]
    ORDER BY [Level] DESC, [PlayerName];
END
GO

CREATE OR ALTER PROC [dbo].[Asset_Insert]
    @assetName    nvarchar(64),
    @levelRequire int
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @inserted TABLE ([AssetId] uniqueidentifier);

    INSERT INTO [dbo].[Asset] ([AssetName], [LevelRequire])
    OUTPUT INSERTED.[AssetId] INTO @inserted
    VALUES (@assetName, @levelRequire);

    SELECT ast.[AssetId], ast.[AssetName], ast.[LevelRequire]
    FROM [dbo].[Asset] ast
    JOIN @inserted i ON i.[AssetId] = ast.[AssetId];
END
GO

CREATE OR ALTER PROC [dbo].[Asset_List]
AS
BEGIN
    SET NOCOUNT ON;

    SELECT [AssetId], [AssetName], [LevelRequire]
    FROM [dbo].[Asset]
    ORDER BY [LevelRequire], [AssetName];
END
GO

CREATE OR ALTER PROC [dbo].[PlayerAsset_Insert]
    @playerId uniqueidentifier,
    @assetId  uniqueidentifier
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO [dbo].[PlayerAsset] ([PlayerId], [AssetId])
    VALUES (@playerId, @assetId);

    SELECT @playerId AS [PlayerId], @assetId AS [AssetId];
END
GO

CREATE OR ALTER PROC [dbo].[Report_PlayerAssets]
    @playerId uniqueidentifier = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        CAST(ROW_NUMBER() OVER (ORDER BY pl.[PlayerName], ast.[AssetName]) AS int) AS [RowNo],
        pl.[PlayerName],
        pl.[Level],
        pl.[Age],
        ast.[AssetName]
    FROM [dbo].[Player] pl
    JOIN [dbo].[PlayerAsset] pa ON pa.[PlayerId] = pl.[PlayerId]
    JOIN [dbo].[Asset] ast ON ast.[AssetId] = pa.[AssetId]
    WHERE (@playerId IS NULL OR pl.[PlayerId] = @playerId);
END
GO
