import jwt from 'jsonwebtoken';
import { config } from '../config.js';

// The imports above are supplied so students can use jwt and config.jwtSecret.
export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  let authPart1;
  if (authHeader == undefined)
  {
    return res.status(401).json({ error: 'Header is wrong.' });
  }else
  {
    const authParts = authHeader.split(" ");
    if (authParts.length != 2 || authParts[0] != "Bearer")
    {
      return res.status(401).json({ error: 'Header is wrong.' });
    }else {authPart1 = authParts[1];}

      try
      {
        const decodedHeader = jwt.verify(authPart1, config.jwtSecret);
        req.user = decodedHeader;
        return next();
      }
      catch
      {
        return res.status(401).json({ error: 'Header is wrong.' });
      }
  }
  
  return res.status(501).json({ error: 'Authentication is not implemented yet.' });
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (allowedRoles.includes(req.user.role))
    {
      return next();
    }else 
    {
      return res.status(403).json({ error: 'Access refused.' });
    }
    return res.status(501).json({ error: 'Authorization is not implemented yet.' });
  };
}

void jwt;
void config;
