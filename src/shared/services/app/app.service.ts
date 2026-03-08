import {get} from "@/lib/http/api.service";
import type {PokemonListResponse} from "./app.types";

export class SheetService {
  private static instance: SheetService;

  private constructor() {
  }

  public static getInstance(): SheetService {
    if (!SheetService.instance) {
      SheetService.instance = new SheetService();
    }
    return SheetService.instance;
  }

  async getPokemon(): Promise<PokemonListResponse> {
    const data = await get<PokemonListResponse>("/pokemon");
    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid pokemon response payload");
    }
    return data;
  }
}

export const sheetService = SheetService.getInstance();
