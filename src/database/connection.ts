import { drizzle } from "drizzle-orm/expo-sqlite";
import * as SQLite from "expo-sqlite";
import * as dietSchema from "@/database/schemas/dietSchema"

// Abrir conexão com o banco de dados
export const DATABASE_NAME = "databese.db";

// Criar a instância do Drizzle
export const expoDb = SQLite.openDatabaseSync(DATABASE_NAME);
export const db = drizzle(expoDb);

export const tableDiet = drizzle(expoDb, { schema: dietSchema });