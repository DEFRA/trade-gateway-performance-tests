export const env = {
  // URL of token service, default local
  tokenUrl:
    !__ENV.ENVIRONMENT || __ENV.ENVIRONMENT === 'local'
      ? 'http://localhost:3001/local/cognito/token'
      : `https://trade-gateway.${__ENV.ENVIRONMENT}.cdp-int.defra.cloud/local/cognito/token`,
  // URL of Trade Gateway service, default local
  serviceUrl:
    !__ENV.ENVIRONMENT || __ENV.ENVIRONMENT === 'local'
      ? 'http://localhost:3001'
      : `https://trade-gateway.${__ENV.ENVIRONMENT}.cdp-int.defra.cloud`,
};
