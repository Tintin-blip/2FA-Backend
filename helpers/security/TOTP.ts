import { authenticator, totp}  from 'otplib';
import { ITOTP } from '../../interfaces/IAuthHelpers';
import { PrismaClient } from '@prisma/client';
import { IUserHelper } from '../../interfaces/IUserHelpers';
const prisma = new PrismaClient()

export class TOTP implements ITOTP { 

  private userHelper:IUserHelper
  
      constructor(userhelper:IUserHelper){ 
        this.userHelper = userhelper
      }
      public async verifyTOTP(userInputCode:string, userId:any) {
    
          const secret:string = await this.userHelper.getTokenByUserId(userId)
          
            authenticator.options = {digits:6, step: 30,window: [1,2]};
            const isValid = authenticator.verify({
              
              token: userInputCode,
              secret:secret, 
            
            });
            const data = { 
              isValid:isValid,
              secret:secret
            }
            return data;
          }
      /*  
    public async generateSecret(userId:number) {
        // generated secret
        const secret = totp.generate(userId)
     
        await prisma.users.update({
          where:{
            id:userId
          },
          data:{
            secret:secret
          }
        })
        return secret;
      }
       */ 
}