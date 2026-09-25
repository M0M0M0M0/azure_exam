USE [BATTLEGAME];
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Asset')
CREATE TABLE [dbo].[Asset] (
    [AssetId]      uniqueidentifier NOT NULL DEFAULT (NEWSEQUENTIALID()),
    [AssetName]    nvarchar(64)     NOT NULL,
    [LevelRequire] int              NOT NULL DEFAULT (0),
    CONSTRAINT [PK_Asset_AssetId] PRIMARY KEY CLUSTERED ([AssetId])
);
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Player')
CREATE TABLE [dbo].[Player] (
    [PlayerId]   uniqueidentifier NOT NULL DEFAULT (NEWSEQUENTIALID()),
    [PlayerName] nvarchar(64)     NOT NULL,
    [FullName]   nvarchar(128)    NULL,
    [Age]        nvarchar(10)     NULL,
    [Level]      int              NOT NULL DEFAULT (1),
    [Email]      nvarchar(64)     NULL,
    CONSTRAINT [PK_Player_PlayerId] PRIMARY KEY CLUSTERED ([PlayerId])
);
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'PlayerAsset')
CREATE TABLE [dbo].[PlayerAsset] (
    [PlayerId] uniqueidentifier NOT NULL,
    [AssetId]  uniqueidentifier NOT NULL,
    CONSTRAINT [PK_PlayerAsset] PRIMARY KEY CLUSTERED ([PlayerId], [AssetId]),
    CONSTRAINT [FK_PlayerAsset_PlayerId] FOREIGN KEY ([PlayerId]) REFERENCES [dbo].[Player] ([PlayerId]) ON DELETE CASCADE,
    CONSTRAINT [FK_PlayerAsset_AssetId] FOREIGN KEY ([AssetId]) REFERENCES [dbo].[Asset] ([AssetId]) ON DELETE CASCADE
);
GO
