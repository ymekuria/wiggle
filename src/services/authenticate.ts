import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
console.log('inside auth');
// Auth0 configuration
const authConfig = {
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256']
};
console.log({ authConfig });
// Usw jwkSRsa to handle public key rotation and load it at runtime from auth server
// the key is cached for some time
const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${authConfig.issuer}.well-known/jwks.json`
});

const authenticate = jwt({
  secret,
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256']
});

export default authenticate;