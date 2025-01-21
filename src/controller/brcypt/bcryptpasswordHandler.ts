import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();




export default class bcryptPasswordHandler 
{
    async hashPassword(password: string): Promise<string> {
      return await bcrypt.hash(password, 10)
    }
  
    // Compare passwords
     async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
      return await bcrypt.compare(password, hashedPassword);
    }
  
}

