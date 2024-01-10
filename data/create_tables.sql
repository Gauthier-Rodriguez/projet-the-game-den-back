BEGIN; 

DROP TABLE IF EXISTS "User", "Game", "Genre", "Platform", "UserGame", "UserGenre", "UserPlatform";

CREATE TABLE "User" (
    "UserID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "Pseudo" TEXT NOT NULL UNIQUE,
    "LastName" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "Email" TEXT NOT NULL UNIQUE,
    "Password" TEXT NOT NULL,
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ
);

CREATE TABLE "Game" (
    "GameID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "Name" TEXT NOT NULL UNIQUE,
    "Image" TEXT NOT NULL UNIQUE,
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ
);

CREATE TABLE "PLatform" (
    "PlatformID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "Name"  TEXT NOT NULL UNIQUE,
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ
);

CREATE TABLE "Genre" (
  "GenreID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "Name"  TEXT NOT NULL UNIQUE,
  "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "Updated_at" TIMESTAMPTZ
);

CREATE TABLE "UserHasGame" (
    "UserGameID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "UserID" INT REFERENCES "User"("UserID"),
    "GameID" INT REFERENCES "Game"("GameID"),
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ
);

CREATE TABLE "UserHasGenre" (
    "UserGenreID" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "UserID" INT REFERENCES "User"("UserID"),
    "GenreID" INT REFERENCES "Genre"("GenreID"),
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ

);

CREATE TABLE "UserHasPlatform" (
    "UserPlatformID" SERIAL PRIMARY KEY,
    "UserID" INT REFERENCES "User"("UserID"),
    "PlatformID" INT REFERENCES "Platform"("PlatformID"),
    "Created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "Updated_at" TIMESTAMPTZ
);

COMMIT;