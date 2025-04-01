import { DietDTO } from "@/dtos/dietDTO"

type DietDataWithoutId = Omit<DietDTO, "id">

export const dietData: DietDataWithoutId[] = [
	{
		name: "X-Salada",
		description:
			"Sanduíche com ovo, alface, tomate, presunto, queijo, carne e pão",
		date: "2023-10-26",
		time: "21:00:00",
		compliant: 0,
	},
	{
		name: "Salada de Frutas",
		description: "Morango, banana, maçã e melão",
		date: "2023-10-27",
		time: "10:30:00",
		compliant: 1,
	},
	{
		name: "Frango Grelhado",
		description: "Filé de frango grelhado com salada",
		date: "2023-10-27",
		time: "12:00:00",
		compliant: 1,
	},
	{
		name: "Pizza",
		description: "Pizza de calabresa",
		date: "2023-10-27",
		time: "20:00:00",
		compliant: 0,
	},
	{
		name: "Omelete",
		description: "Omelete com queijo e tomate",
		date: "2023-10-28",
		time: "08:00:00",
		compliant: 1,
	},
	{
		name: "Sopa de Legumes",
		description: "Sopa de cenoura, batata e abóbora",
		date: "2023-10-28",
		time: "19:00:00",
		compliant: 1,
	},
	{
		name: "Hambúrguer",
		description: "Hambúrguer com batata frita",
		date: "2023-10-28",
		time: "22:00:00",
		compliant: 0,
	},
	{
		name: "Iogurte com Granola",
		description: "Iogurte natural com granola e mel",
		date: "2023-10-29",
		time: "09:00:00",
		compliant: 1,
	},
	{
		name: "Peixe Assado",
		description: "Filé de peixe assado com legumes",
		date: "2023-10-29",
		time: "13:00:00",
		compliant: 1,
	},
	{
		name: "Chocolate",
		description: "Barra de chocolate ao leite",
		date: "2023-10-29",
		time: "16:00:00",
		compliant: 0,
	},
	{
		name: "Salada de Atum",
		description: "Salada com atum, ovo e tomate",
		date: "2023-10-30",
		time: "11:00:00",
		compliant: 1,
	},
	{
		name: "Carne com Batata Doce",
		description: "Carne magra com batata doce cozida",
		date: "2023-10-30",
		time: "14:00:00",
		compliant: 1,
	},
	{
		name: "Sorvete",
		description: "Sorvete de chocolate",
		date: "2023-10-30",
		time: "17:00:00",
		compliant: 0,
	},
	{
		name: "Frango com Salada",
		description: "Frango cozido com salada verde",
		date: "2023-10-31",
		time: "12:00:00",
		compliant: 1,
	},
	{
		name: "Macarrão Integral",
		description: "Macarrão integral com molho de tomate",
		date: "2023-10-31",
		time: "19:00:00",
		compliant: 1,
	},
	{
		name: "Bolo de Chocolate",
		description: "Fatia de bolo de chocolate",
		date: "2023-10-31",
		time: "21:00:00",
		compliant: 0,
	},
	{
		name: "Omelete com Espinafre",
		description: "Omelete com espinafre e queijo branco",
		date: "2023-11-01",
		time: "08:30:00",
		compliant: 1,
	},
	{
		name: "Salmão Grelhado",
		description: "Salmão grelhado com brócolis",
		date: "2023-11-01",
		time: "13:30:00",
		compliant: 1,
	},
	{
		name: "Coxinha",
		description: "Coxinha de frango",
		date: "2023-11-01",
		time: "16:30:00",
		compliant: 0,
	},
	{
		name: "Aveia com Frutas",
		description: "Aveia com banana e morango",
		date: "2023-11-02",
		time: "09:30:00",
		compliant: 1,
	},
]
