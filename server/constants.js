const EXPIRE_1M = 60;
const EXPIRE_1H = 3600;
const EXPIRE_24H = EXPIRE_1H * 24;
const EXPIRE_48H = EXPIRE_24H * 2;
const EXPIRE_1W = EXPIRE_24H * 7;
const EXPIRE_1Y = 365;
const TOTAL_CONFIRMATIONS_COLLECTION = "TOTAL_CONFIRMATIONS";
const TOTAL_CONFIRMATIONS_KEY_24H = "TOTAL_CONFIRMATIONS_24H";
const TOTAL_CONFIRMATIONS_KEY_48H = "TOTAL_CONFIRMATIONS_48H";
const TOTAL_NANO_VOLUME_COLLECTION = "TOTAL_NANO_VOLUME";
const TOTAL_NANO_VOLUME_KEY_24H = "TOTAL_NANO_VOLUME_24H";
const TOTAL_NANO_VOLUME_KEY_48H = "TOTAL_NANO_VOLUME_48H";
const MARKET_CAP_RANK_COLLECTION = "MARKET_CAP_RANK_COLLECTION";
const MARKET_CAP_RANK = "MARKET_CAP_RANK";
const MARKET_CAP_RANK_24H = "MARKET_CAP_RANK_24H";
const EXCHANGE_BALANCES_COLLECTION = "EXCHANGE_BALANCES";
const COINGECKO_MARKET_STATS = "COINGECKO_MARKET_STATS";
const DISTRIBUTION = "DISTRIBUTION";
const DORMANT_FUNDS = "DORMANT_FUNDS";
const STATUS = "STATUS";
const COINGECKO_PRICE_STATS = "COINGECKO_PRICE_STATS";
const LARGE_TRANSACTIONS = "LARGE_TRANSACTIONS";
const CONFIRMATIONS_PER_SECOND = "CONFIRMATIONS_PER_SECOND";
const MONGO_URL = "mongodb://localhost:27017";
const MONGO_DB = "nanolooker";
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  numberOfRetries: 100,
};

// https://api.coingecko.com/api/v3/simple/supported_vs_currencies
const SUPPORTED_CRYPTOCURRENCY = require("./supported-cryptocurrency");

module.exports = {
  EXPIRE_1M,
  EXPIRE_1H,
  EXPIRE_24H,
  EXPIRE_48H,
  EXPIRE_1W,
  EXPIRE_1Y,
  TOTAL_CONFIRMATIONS_COLLECTION,
  TOTAL_CONFIRMATIONS_KEY_24H,
  TOTAL_CONFIRMATIONS_KEY_48H,
  TOTAL_NANO_VOLUME_COLLECTION,
  TOTAL_NANO_VOLUME_KEY_24H,
  TOTAL_NANO_VOLUME_KEY_48H,
  MARKET_CAP_RANK_COLLECTION,
  MARKET_CAP_RANK,
  MARKET_CAP_RANK_24H,
  EXCHANGE_BALANCES_COLLECTION,
  COINGECKO_MARKET_STATS,
  COINGECKO_PRICE_STATS,
  LARGE_TRANSACTIONS,
  CONFIRMATIONS_PER_SECOND,
  DISTRIBUTION,
  DORMANT_FUNDS,
  STATUS,
  MONGO_URL,
  MONGO_DB,
  MONGO_OPTIONS,
  SUPPORTED_CRYPTOCURRENCY,
};
