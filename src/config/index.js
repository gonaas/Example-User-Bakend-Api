const fs = require("fs");

const privateKey = fs.readFileSync(`${__dirname}/certs/.private.key`);
const publicKey = fs.readFileSync(`${__dirname}/certs/.public.key`);

module.exports = {
  env: process.env.NODE_ENV || "development",
  platformName: process.env.PLATFORM_NAME || "test",
  baseUrl: process.env.BASE_URL || "http://localhost:9000",
  port: process.env.PORT || 4000,
  jwt: {
    private: privateKey,
    public: publicKey,
    expiresIn: process.env.JWT_EXPIRESIN || 3600,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/database",
  },
  pagination: {
    pageSize: 15,
    maxPageSize: 100,
  },
  login: {
    retries: 5,
    timeFrame: 60, // in minutes
  },
  crypto: {
    publicKey: JSON.parse(`"${process.env.CRYPTO_PUBLIC_KEY}"`) || "",
    privateKey: JSON.parse(`"${process.env.CRYPTO_PRIVATE_KEY}"`) || "",
  },
};
