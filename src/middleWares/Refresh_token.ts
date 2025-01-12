import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';
import TokenHandler from '../controller/UserService/TokenHandler';
export const RefreshToken = (req: Request, res: Response): Response => {
    const refreshToken = req.cookies?.refreshToken;
    console.log("refreshToken",refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not provided' });
    }
  
    const Public_key = process.env.PUBLIC_KEY ;
    if (!Public_key) 
        {
      console.error('PUBLIC_KEY key is missing in environment variables');
      return res.status(500).json({ message: 'Server configuration error' });
    }
  
    const tokenHandler = new TokenHandler();
  
    try {
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken, Public_key) as JwtPayload;
  
      // Generate a new access token
      const newAccessToken = tokenHandler.generateAccessToken(decoded.id);
      return res.json({ accessToken: newAccessToken });
    } 
    catch (err) 
    {
      console.error('Error verifying refresh token:', err);
  
      // Handle specific JWT errors
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: 'Refresh token has expired' });
      }
  
      if (err instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }
  
      // Catch-all for other errors
      return res.status(500).json({ message: 'An error occurred while processing the refresh token' });
    }
  };