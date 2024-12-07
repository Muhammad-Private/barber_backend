import { Response,Request } from "express"
import { QueryService } from "../../database/querys/queryService";
export default class AddRole extends QueryService{
    constructor()
    {
        super()
    }
    public async AddRole(req: Request, res: Response) {
        try {
            const { UserId, email,UserName, PhoneNumber, RoleFor, SoltTime, Payment } = req.body;
            const query = `SELECT add_appointment($1, $2, $3, $4, $5, $6,$7)`;  
            
            await this.query(query, [UserId,email, UserName, PhoneNumber, RoleFor, SoltTime, Payment]);
            res.status(200).json({message:"Appointment successfully booked."});
        }
         catch (error:any) {
            // Handle errors, such as a duplicate slot booking
            res.status(400).json({message:`Failed to book appointment: ${error.message}`});
        }
    }
}