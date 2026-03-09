import {get} from "@/lib/http/api.service";
import type {PokemonDetailResponse, PokemonListResponse, TypeDetailResponse, TypeListResponse} from "./app.types";

export class AppService {
  private static instance: AppService;

  private constructor() {
  }

  public static getInstance(): AppService {
    if (!AppService.instance) {
      AppService.instance = new AppService();
    }
    return AppService.instance;
  }

  /**
   * Get paginated list of all Pokémon
   */
  async getPokemon(limit = 1000, offset = 0): Promise<PokemonListResponse> {
    const data = await get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid pokemon response payload");
    }
    return data;
  }

  async getTypes(): Promise<TypeListResponse> {
    const data = await get<TypeListResponse>("/type");
    if (!data || !Array.isArray(data.results)) {
      throw new Error("Invalid types response payload");
    }

    // Make parallel requests to each type's url
    try {
      const typeDetails = await Promise.all(
        data.results.map(async (type) => {
            return await get<TypeDetailResponse>(type.url)
          }
        )
      )
      return {
        ...data,
        results: typeDetails,
      };
    } catch (error) {
      console.warn(`Parallel type requests failed: ${error}`);
      return data;
    }
  }

  /**
   * Get detailed information about a specific type
   * Including all Pokémon that belong to that type
   */
  async getTypeDetail(typeNameOrId: string | number): Promise<TypeDetailResponse> {
    const data = await get<TypeDetailResponse>(`/type/${typeNameOrId}`);
    if (!data || !data.pokemon) {
      throw new Error("Invalid type detail response payload");
    }
    return data;
  }

  /**
   * Get detailed information about a specific Pokémon
   */
  async getPokemonDetail(nameOrId: string | number): Promise<PokemonDetailResponse> {
    const data = await get<PokemonDetailResponse>(`/pokemon/${nameOrId}`);
    if (!data || !data.id) {
      throw new Error("Invalid pokemon detail response payload");
    }
    return data;
  }
}

export const appService = AppService.getInstance();


