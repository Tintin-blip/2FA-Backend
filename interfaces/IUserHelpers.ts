// interfaces/IUserHelper.ts
export interface IUserHelper {
    getUserInfoByEmail(email: string, password: string): Promise<{id:number,password:string,secret:string}>;
    getTokenByUserId(userId: number): Promise<string>;
  }
  