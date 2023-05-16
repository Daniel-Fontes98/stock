-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "name" TEXT NOT NULL,
    "quantityUnit" INTEGER NOT NULL DEFAULT 0,
    "quantityBox" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Item" ("createdAt", "id", "name", "quantityBox", "quantityUnit", "updatedAt") SELECT "createdAt", "id", "name", "quantityBox", "quantityUnit", "updatedAt" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
