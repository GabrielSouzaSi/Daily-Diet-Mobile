import * as dietSchema from "@/database/schemas/dietSchema";
import { tableDiet } from "./connection";
import { count, eq } from "drizzle-orm";
import { DietDTO } from "@/dtos/dietDTO";

// Função para buscar as dietas no banco 
export async function getDiets() {
    try {
        const response = await tableDiet.query.diet.findMany()
        return response
    } catch (error) {
        console.log("getDiets error =>" + error);
    }
}
// Função para editar uma dieta no banco 
export async function upDiet(diet: DietDTO) {
    try {
         await tableDiet.update(dietSchema.diet).set(diet).where(eq(dietSchema.diet.id, diet.id))
    } catch (error) {
        console.log("Update Diet error =>" + error);
    }
}
// Função para deletar no banco a dieta por ID
export async function delDietId(id: number) {
    try {
        await tableDiet.delete(dietSchema.diet).where(eq(dietSchema.diet.id, id));
        return true
    } catch (error) {
        console.log("delDietId error =>" + error);
    }
}
// Função para adicionar no banco a dieta
export async function addDiet(data: any) {
    try {
        tableDiet.insert(dietSchema.diet).values(data).run();
        return true
    } catch (error) {
        console.log("addDiet error =>" + error);
    }
}

// Função para verificar a quantidade refeições fora da dieta
export async function offDiet() {
    try {
        const response = await tableDiet.select({ count: count() }).from(dietSchema.diet).where(eq(dietSchema.diet.compliant, false)); // false representa (fora da dieta)

        if (response.length > 0 && response[0].count !== undefined) {
            return response[0].count;
        } else {
            return 0; // Retorna 0 se não houver registros ou se a contagem for indefinida.
        }
    } catch (error) {
        console.log("affDiet error =>" + error);
    }
}
// Função para verificar a quantidade refeições dentro da dieta
export async function onDiet() {
    try {
        const response = await tableDiet.select({ count: count() }).from(dietSchema.diet).where(eq(dietSchema.diet.compliant, true)); // true representa (fora da dieta)

        if (response.length > 0 && response[0].count !== undefined) {
            return response[0].count;
        } else {
            return 0; // Retorna 0 se não houver registros ou se a contagem for indefinida.
        }
    } catch (error) {
        console.log("affDiet error =>" + error);
    }
}
// Função para verificar a melhor sequencia de pratos dentro da dieta
export async function sequenceDiet() {
    try {
        const response = await tableDiet.select().from(dietSchema.diet).orderBy(dietSchema.diet.date)

        if (!response || response.length === 0) {
            return null
        }

        let longestSequence = 0;
        let longestSequenceDate = "";
        let currentSequence = 0;
        let currentDate = "";

        for (const record of response) {
            if (record.compliant === true) {
                if (currentDate === record.date) {
                    currentSequence++;
                } else {
                    currentDate = record.date;
                    currentSequence = 1;
                }

                if (currentSequence > longestSequence) {
                    longestSequence = currentSequence;
                    longestSequenceDate = currentDate;
                }
            } else {
                // Se não for compliant, reinicia a sequência
                currentSequence = 0;
            }
        }
        return { date: longestSequenceDate, sequence: longestSequence };
    } catch (error) {
        console.log("affDiet error =>" + error);
    }
}

export async function statisticDiet() {
    try {
        let { sequence } = await sequenceDiet();
        let diet = await getDiets();
        let dietOff = await offDiet();
        let dietOn = await onDiet();
        let percentage = ((dietOn / diet.length) * 100).toFixed(2)
        let statusDiet = (Number(percentage) > 70) ? true : false

        return {
            diet,
            dietCount: diet.length,
            dietOff,
            dietOn,
            statusDiet,
            percentage,
            sequence
        }

    } catch (error) {
        console.log("statisticDiet => ", error);
    }
}