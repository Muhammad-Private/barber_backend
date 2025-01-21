import { Response, Request } from "express";
import addApponiment from "../../database/querys/AddApponimentQuery";
import dayjs from "dayjs";


interface RoleData {
    userID: string;
    userName: string;
    slot_date: dayjs.Dayjs |null;
    phoneNumber: string;
    city: string;
    barber: string;
    roleFor: string;
}


   export  async function Add_Apponiment(req: Request, res: Response) 
    {
        try {
            const { userID, userName, phoneNumber, city, barber, roleFor,slot_date }: RoleData = req.body;
            if (!userID || !userName || !phoneNumber || !city || !barber || !roleFor || !slot_date) 
                {
                return res.status(400).json({ message: "All fields are required." });
            }
            const AddApponiment = new addApponiment(userID, userName, slot_date, city, barber, phoneNumber, roleFor);
            const result = await AddApponiment.AddApponiment();
            if (!result.isRoleAdded) 
                {
                return res.status(400).json({ message: "Failed to book appointment." });
                }
            return res.status(200).json({ message: "Appointment successfully booked." });
        } 
        catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: `Failed to book appointment: ${error.message}` });
        }
    }
