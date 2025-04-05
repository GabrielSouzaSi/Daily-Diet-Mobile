// comando para gerar a tabela
// npx drizzle-kit generate

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const diet = sqliteTable("diets", {
	id: integer("id").primaryKey(),
	name: text("name"),
	description: text("description"),
	date: text("date"),
	time: text("time"),
	compliant: integer("compliant", { mode: "boolean" }),
})
