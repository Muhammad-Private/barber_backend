import { GlobalQuery } from './GlobalQuery';

import { RoleData } from '../../interfaces/RoleData';

type deletedata=Pick<RoleData,  'slot_date' | 'userID'>;

export default class deleteApponiment extends GlobalQuery 
{
    private userID
    private slot_date
    constructor({userID, slot_date }:deletedata) 
    {
        super();
        this.userID = userID;
        this.slot_date = slot_date;
    }

    public async deleteApponiment(): Promise<any> {
        try {
            const query = `SELECT delete_appointment($1, $2) `; ;
            await this.query(query, [this.userID, this.slot_date]);
        } 
        catch (error: any) {
            console.error(error);
            throw new Error(`Failed to delete appointment: ${error.message}`);
            
        }
    }
}
