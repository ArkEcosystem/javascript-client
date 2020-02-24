import { ApiQuery, IResponse } from "../interfaces";
import {
	AllWalletsApiQuery,
	SearchWalletsApiBody,
	WalletsTransactionsApiQuery,
	WalletsTransactionsReceivedApiQuery,
	WalletsTransactionsSentApiQuery,
} from "../resourcesTypes/wallets";
import { Resource } from "./resource";

/**
 * Wallets are addresses containing, or previously having contained ARK.
 *
 * A wallet's public key may be unknown to the network, in that case, it is referred to as a `cold wallet`.
 */
export class Wallets extends Resource {
	/**
	 * List All Wallets
	 *
	 * A paginated API is provided to obtain all wallets, including empty ones.
	 */
	public async all<T = any>(query?: AllWalletsApiQuery): Promise<IResponse<T>> {
		return this.sendGet("wallets", query);
	}

	/**
	 * Retrieve a Wallet
	 *
	 * Specific wallets can be obtained either by their `publicKey` or `address`.
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async get<T = any>(addressOrPublicKey: string): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}`);
	}

	/**
	 * List All Transactions of a Wallet
	 *
	 * All transactions belonging to a wallet can be obtained using this API.
	 *
	 * Equivalent to `transactions/search` with parameters `senderId` and `recipientId`.
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async transactions<T = any>(
		addressOrPublicKey: string,
		query?: WalletsTransactionsApiQuery,
	): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}/transactions`, query);
	}

	/**
	 * List All Received Transactions of a Wallet
	 *
	 * Incoming transactions can be obtained as well.
	 *
	 * Equivalent to `transactions/search` with parameter `recipientId` set.
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async transactionsReceived<T = any>(
		addressOrPublicKey: string,
		query?: WalletsTransactionsReceivedApiQuery,
	): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}/transactions/received`, query);
	}

	/**
	 * List All Sent Transactions of a Wallet
	 *
	 * The inverse of `transactions/received`.
	 *
	 * > Note that the balance of a wallet does not equal `totalIncoming - totalOutgoing` if the wallet is a Delegate. You must then also add the total reward from transaction fees and forged blocks to their balance.
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async transactionsSent<T = any>(
		addressOrPublicKey: string,
		query?: WalletsTransactionsSentApiQuery,
	): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}/transactions/sent`, query);
	}

	/**
	 * List All Votes of a Wallet
	 *
	 * Returns all votes made by the wallet.
	 *
	 * Often users create a new wallet instead of recasting their vote, as the former was historically cheaper.
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async votes<T = any>(addressOrPublicKey: string, query?: ApiQuery): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}/votes`, query);
	}

	/**
	 * List All Top Wallets
	 *
	 * Sort the wallets by their balance.
	 *
	 * Most top wallets belong to exchanges and the frozen remainder from the ARK ICO.
	 */
	public async top<T = any>(query?: ApiQuery): Promise<IResponse<T>> {
		return this.sendGet("wallets/top", query);
	}

	/**
	 * Search All Wallets
	 *
	 * Searching for specific wallets is possible as well.
	 *
	 * A direct database query usually is more performant when the query expression becomes complicated.
	 */
	public async search<T = any>(payload: SearchWalletsApiBody, query?: ApiQuery): Promise<IResponse<T>> {
		return this.sendPost("wallets/search", payload, query);
	}

	/**
	 * List All Locks of a Wallet
	 *
	 * @param addressOrPublicKey The identifier of the wallet to be retrieved.
	 */
	public async locks<T = any>(addressOrPublicKey: string, query?: ApiQuery): Promise<IResponse<T>> {
		return this.sendGet(`wallets/${addressOrPublicKey}/locks`, query);
	}
}
