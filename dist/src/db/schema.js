"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.products = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.products = (0, pg_core_1.pgTable)("products", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 256 }).notNull(),
    price: (0, pg_core_1.real)("price").notNull(),
});
