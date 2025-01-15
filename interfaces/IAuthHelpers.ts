// interfaces/IAuth.ts
export interface IAuth {
    passwordMatch(password: string, userPassword: string): Promise<boolean>;
    generateHash(password: string): Promise<string>;
  }

export interface ITOTP {
    verifyTOTP(userInputCode: string, userId: number): Promise<{ isValid: boolean; secret: string }>;
  //generateSecret(userId: number): Promise<string>;

}