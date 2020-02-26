import { ApiResponse } from "../interfaces";
import { Resource } from "./resource";
import {
	AllBusinessesApiQuery,
	BusinessBridgechainsApiQuery,
	SearchBusinesssApiBody,
	SearchBusinesssApiQuery,
	Business,
	Bridgechain,
} from "../resourcesTypes";

export class Businesses extends Resource {
	/**
	 * List all businesses
	 */
	public async all(query?: AllBusinessesApiQuery): Promise<ApiResponse<Business[]>> {
		return this.sendGet("businesses", query);
	}

	/**
	 * Return business by wallet address
	 *
	 * @param walletAddress The identifier of the wallet to be retrieved.
	 */
	public async get(walletAddress: string): Promise<ApiResponse<Business>> {
		return this.sendGet(`businesses/${walletAddress}`);
	}

	/**
	 * Return bridgechains of a business
	 *
	 * @param walletAddress The identifier of the wallet to be retrieved.
	 */
	public async bridgechains(
		walletAddress: string,
		query?: BusinessBridgechainsApiQuery,
	): Promise<ApiResponse<Bridgechain[]>> {
		return this.sendGet(`businesses/${walletAddress}/bridgechains`, query);
	}

	/**
	 * Search business
	 */
	public async search(
		payload?: SearchBusinesssApiBody,
		query?: SearchBusinesssApiQuery,
	): Promise<ApiResponse<Business[]>> {
		return this.sendPost("businesses/search", payload, query);
	}
}
