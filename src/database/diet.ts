import * as dietSchema from "@/database/schemas/dietSchema"
import { tableDiet } from "./connection"
import { count, desc, eq } from "drizzle-orm"
import { DietDTO } from "@/dtos/dietDTO"
import { GroupedDiets } from "@/dtos/groupDiets"

type OmidIdDietDTO = Omit<DietDTO, "id">

// Função para buscar as dietas no banco
export async function getDiets(): Promise<DietDTO[] | null> {
	try {
		const response = await tableDiet.query.diet.findMany()
		if (response.length > 0) {
			return response as DietDTO[]
		} else {
			return null // Retorna 0 se não houver registros ou se a contagem for indefinida.
		}
	} catch (error) {
		console.log("getDiets error =>" + error)
	}
}
// Função para buscar as dieta por id no banco
export async function getDietId(id: number): Promise<DietDTO | null> {
	try {
		const response = await tableDiet
			.select()
			.from(dietSchema.diet)
			.where(eq(dietSchema.diet.id, id))
		if (response.length > 0) {
			return response[0] as DietDTO
		} else {
			return null // Retorna 0 se não houver registros ou se a contagem for indefinida.
		}
	} catch (error) {
		console.log("getDietId error =>" + error)
	}
}
// Função para buscar as dietas no banco ordenado por data e hora, agrupar por data e hora
export async function getDietsOrder(): Promise<GroupedDiets[] | null> {
	try {
		const response = await tableDiet
			.select()
			.from(dietSchema.diet)
			.orderBy(desc(dietSchema.diet.date), desc(dietSchema.diet.time))

		if (!response || response.length === 0) {
			return null
		}

		const grouped: Record<string, DietDTO[]> = {}

		for (const meal of response) {
			const formattedMeal: DietDTO = {
				...meal,
				compliant: meal.compliant ? 1 : 0, // converte booleano para número
			}

			if (!grouped[meal.date]) {
				grouped[meal.date] = []
			}
			grouped[meal.date].push(formattedMeal)
		}

		const result: GroupedDiets[] = Object.entries(grouped).map(
			([date, meals]) => ({
				date,
				meals,
			})
		)

		return result
	} catch (error) {
		console.log("getDiets error =>" + error)
	}
}
// Função para editar uma dieta no banco
export async function upDiet(diet: DietDTO) {
	try {
		await tableDiet
			.update(dietSchema.diet)
			.set(diet)
			.where(eq(dietSchema.diet.id, diet.id))
	} catch (error) {
		console.log("Update Diet error =>" + error)
	}
}
// Função para deletar no banco a dieta por ID
export async function delDietId(id: number) {
	try {
		await tableDiet
			.delete(dietSchema.diet)
			.where(eq(dietSchema.diet.id, id))
		return true
	} catch (error) {
		console.log("delDietId error =>" + error)
	}
}
// Função para deletar no banco a dieta
export async function delDiet(): Promise<boolean> {
	try {
		await tableDiet.delete(dietSchema.diet)
		console.log("Todos os registros da tabela diet foram deletados.")
		return true
	} catch (error) {
		console.log("delDiet error =>" + error)
	}
}
// Função para adicionar no banco a dieta
export async function addDiet(data: OmidIdDietDTO | OmidIdDietDTO[]) {
	try {
		tableDiet.insert(dietSchema.diet).values(data).run()
		return true
	} catch (error) {
		console.log("addDiet error =>" + error)
	}
}
// Função para verificar a quantidade refeições fora da dieta
export async function offDiet() {
	try {
		const response = await tableDiet
			.select({ count: count() })
			.from(dietSchema.diet)
			.where(eq(dietSchema.diet.compliant, false)) // false representa (fora da dieta)

		if (response.length > 0 && response[0].count !== undefined) {
			return response[0].count
		} else {
			return 0 // Retorna 0 se não houver registros ou se a contagem for indefinida.
		}
	} catch (error) {
		console.log("affDiet error =>" + error)
	}
}
// Função para verificar a quantidade refeições dentro da dieta
export async function onDiet() {
	try {
		const response = await tableDiet
			.select({ count: count() })
			.from(dietSchema.diet)
			.where(eq(dietSchema.diet.compliant, true)) // true representa (fora da dieta)

		if (response.length > 0 && response[0].count !== undefined) {
			return response[0].count
		} else {
			return 0 // Retorna 0 se não houver registros ou se a contagem for indefinida.
		}
	} catch (error) {
		console.log("affDiet error =>" + error)
	}
}
// Função para verificar a melhor sequencia de pratos dentro da dieta
export async function sequenceDiet() {
	try {
		const response = await tableDiet
			.select()
			.from(dietSchema.diet)
			.orderBy(dietSchema.diet.date)

		if (!response || response.length === 0) {
			return null
		}

		let longestSequence = 0
		let longestSequenceDate = ""
		let currentSequence = 0
		let currentDate = ""

		for (const record of response) {
			if (record.compliant === true) {
				if (currentDate === record.date) {
					currentSequence++
				} else {
					currentDate = record.date
					currentSequence = 1
				}

				if (currentSequence > longestSequence) {
					longestSequence = currentSequence
					longestSequenceDate = currentDate
				}
			} else {
				// Se não for compliant, reinicia a sequência
				currentSequence = 0
			}
		}
		return { date: longestSequenceDate, sequence: longestSequence }
	} catch (error) {
		console.log("affDiet error =>" + error)
	}
}
// Função para retornar a porcentagem e status da dieta com base na quantidade refeições dentro da dieta
export async function statisticDiet() {
	try {
		let diets = await getDiets()
		if (diets) {
			let sequence = await sequenceDiet()
			let dietOff = await offDiet()
			let dietOn = await onDiet()
			let percentage = ((dietOn / diets.length) * 100).toFixed(2)
			let statusDiet = Number(percentage) > 70 ? true : false

			return {
				diets,
				dietCount: diets.length,
				dietOff,
				dietOn,
				statusDiet,
				percentage,
				sequence,
			}
		} else {
			return {
				diets: null,
				dietCount: null,
				dietOff: null,
				dietOn: null,
				statusDiet: null,
				percentage: null,
				sequence: null,
			}
		}
	} catch (error) {
		console.log("statisticDiet => ", error)
	}
}
