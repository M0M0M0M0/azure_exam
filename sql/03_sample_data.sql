USE [BATTLEGAME];
GO

IF (SELECT COUNT(*) FROM [dbo].[Player]) = 0
BEGIN
    INSERT INTO [dbo].[Asset] ([AssetName], [LevelRequire])
    VALUES (N'Hero 1', 1), (N'Hero 2', 1);

    INSERT INTO [dbo].[Player] ([PlayerName], [FullName], [Age], [Level], [Email])
    VALUES
        (N'Player 1', N'Hoang Minh Khoa', N'20', 10, N'khoa.hm@studio.game'),
        (N'Player 2', N'Vu Thu Trang',    N'19', 3,  N'trang.vt@studio.game'),
        (N'Player 3', N'Do Quang Huy',    N'23', 10, N'huy.dq@studio.game');

    INSERT INTO [dbo].[PlayerAsset] ([PlayerId], [AssetId])
    SELECT pl.[PlayerId], ast.[AssetId]
    FROM (VALUES (N'Player 1', N'Hero 1'), (N'Player 2', N'Hero 2'), (N'Player 3', N'Hero 1')) map ([PlayerName], [AssetName])
    JOIN [dbo].[Player] pl ON pl.[PlayerName] = map.[PlayerName]
    JOIN [dbo].[Asset] ast ON ast.[AssetName] = map.[AssetName];
END
GO
