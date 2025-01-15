import { PrismaClient } from "@prisma/client"

import { IUserHelper} from '../interfaces/IUserHelpers'
const prisma = new PrismaClient()
export class userHelper  implements IUserHelper{
    
    constructor() {
      
    }
    public async getUserInfoByEmail(email:string) { 
        try { 

            const verifyExist = await prisma.users.findFirstOrThrow( { 
                where:{
                  email:email
                },
                select: {
                    id:true,
                    password:true,
                    secret:true
                }
            })

          
            if(!verifyExist || !verifyExist.password) { 
                throw new Error('Password no exists')
            }
            
            if(!verifyExist) { 
             throw new Error('Name or password not match')
            }
        
            return { 
                id: verifyExist.id, 
                password: verifyExist.password, 
                secret: verifyExist.secret || ''
              };

        }catch(err) { 
            console.log('error',err)
            throw err
        }
    }
    public async getTokenByUserId(userId:number) { 

        const storedSecret = await prisma.users.findUnique( { 
            where:{
              id:userId
            },
            select: {
              secret:true
            } } )
        
            if (!storedSecret || !storedSecret.secret) {
              throw new Error('User does not have a valid secret');
          }
          return storedSecret.secret
    }
}