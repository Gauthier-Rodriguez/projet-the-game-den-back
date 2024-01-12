BEGIN;

INSERT INTO "Genre"
("id","Name")
VALUES 
(1, 'Action'),
(2, 'Indie'),
(3, 'Adventure'),
(4, 'RPG'),
(5, 'Strategy'),
(6, 'Shooter'),
(7, 'Casual'),
(8, 'Simulation'),
(9, 'Puzzle'),
(10, 'Arcade'),
(11, 'Platformer'),
(12, 'Massively Multiplayer'),
(13, 'Racing'),
(14, 'Sports'),
(15, 'Fighting'),
(16, 'Family'),
(17, 'Board Games'),
(18, 'Educational'),
(19, 'Card')
;

INSERT INTO "Platform"
("Name")
VALUES
('PC'),
('Xbox Series S/X'),
('Nintendo 3DS'),
('Linux'),
('PlayStation 2'),
('Wii U'),
('Game Boy Advance'),
('NES'),
('Atari 7800'),
('Genesis'),
('SEGA Master System'),
('Game Gear'),
('PlayStation 5'),
('Nintendo Switch'),
('Nintendo DS'),
('Xbox 360'),
('PlayStation'),
('Wii'),
('Game Boy Color'),
('Classic Macintosh'),
('Atari 5200'),
('Atari ST'),
('SEGA Saturn'),
('Dreamcast'),
('Neo Geo'),
('PlayStation 4'),
('iOS'),
('Nintendo DSi'),
('Xbox'),
('PS Vita'),
('GameCube'),
('Game Boy'),
('Apple II'),
('Atari 2600'),
('Atari Lynx'),
('SEGA CD'),
('3DO'),
('Web'),
('Xbox One'),
('Android'),
('macOS'),
('PlayStation 3'),
('PSP'),
('Nintendo 64'),
('SNES'),
('Commodore / Amiga'),
('Atari Flashback'),
('Atari XEGS'),
('SEGA 32X'),
('Jaguar');



COMMIT;