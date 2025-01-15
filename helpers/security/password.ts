import bcrypt from 'bcrypt'
import { IUserHelper } from '../../interfaces/IUserHelpers';
import { IAuth }   from '../../interfaces/IAuthHelpers';

export class Auth implements IAuth { 

    constructor(){ 
    }
  
    public async passwordMatch  (password:string,userPassword:string):Promise <boolean> { 
      return await bcrypt.compare(password, userPassword);
    
  }
  public  generateHash = async (password:string) => {
      const saltRounds = 12; 
      const hashedPassword:any = bcrypt.hash(password, saltRounds); //
      return hashedPassword
    };



}