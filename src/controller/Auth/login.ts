import { Request, Response } from 'express';
import hashing from '../UserService/hashing';
import { Querys } from './../../database/querys/querys';

export default class Login extends hashing {
  private Query: Querys;

  constructor() {
    super();
    this.Query = new Querys();
  }

  public async Login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      // Validate request body
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
      }

      // Check if user exists
      const user = await this.Query.userExists(email);

      if (!user || user.rows.length === 0) {
        return res.status(401).json({ message: "User not found." });
      }

      // Compare hashed password
      const hashedPassword = user.rows[0].password;
      const isMatch = await this.comparePasswords(password, hashedPassword);

      if (!isMatch) 
        {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      // Generate tokens
      const access_token = this.generateAccessToken(user.rows[0].email);
      const refresh_token = this.generateRefreshToken(user.rows[0].email);

      // Set refresh token as HTTP-only cookie
      res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
       // secure: process.env.NODE_ENV === "production", // Set to true in production
        sameSite: "strict",
      });

      // Respond with success
      return res.status(200).json({
        message: "Login successful.",
        userID: user.rows[0].id,
        access_token,
      });
    } 
    catch (error: any) {
      return res.status(500).json({ message: `An error occurred: ${error.message}` });
    }
  }
}