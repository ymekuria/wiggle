import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

// Auth0 configuration
const authConfig = {
  issuer: process.env.AUTH0_ISSUER,
  audience: process.env.AUTH0_AUDIENCE,
  algorithm: ['RS256']
};

// Usw jwkSRsa to handle public key rotation and load it at runtime from auth server
// the key is cached for some time
const secret = jwksRsa.expressJwtSecret({
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5,
  jwksUri: `${authConfig.issuer}.well-known/jwks.son`
});

const authenticate = jwt({ secret, ...authConfig });

export default authenticate;
