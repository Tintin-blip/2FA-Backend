import { Request, Response } from "express";
import {baseResponse } from '../messages/messagesStatus'
import {QR} from '../helpers/qrHelpers'
import { IUserHelper } from "../interfaces/IUserHelpers";
import { IAuth, ITOTP } from "../interfaces/IAuthHelpers";

export class userController {
    private userHelper: IUserHelper;
    private auth: IAuth;
    private baseResponse:baseResponse 
    private qr:QR;
    private TOTP:ITOTP

    constructor(userHelper:IUserHelper,auth: IAuth,TOTP:ITOTP) {
        this.userHelper = userHelper;
        this.auth = auth;
        this.baseResponse = new baseResponse()
        this.qr = new QR()
        this.TOTP = TOTP;
        this.twoFaAuthentication = this.twoFaAuthentication.bind(this);
    }

    public signUpController = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.userHelper.getUserInfoByEmail(email, password);
            const id_user = user.id
            const isMatch = await this.auth.passwordMatch(password,user.password)

            if(!isMatch) { 
                throw new Error('Password is not match')
            }
            
            const qr = await this.qr.createQr(user.secret)
            this.baseResponse.sendResponse(res,200,'Signed',{id_user,qr})
            //res.status(200).set('Content-Type', 'image/png').send(Buffer.from(qr.split(',')[1], 'base64'));
        } catch (err:any) {
            if(err.message == 'Name or password no match') { 
                return this.baseResponse.unauthorized(res,'Error sign up')
            }
            if(err.message == 'Password is not match') { 
                return this.baseResponse.unauthorized(res,'Error sign up')
            }
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    public async twoFaAuthentication  (req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { inputUserCode } = req.body;
            console.log(inputUserCode)
            if (!inputUserCode) {
                return this.baseResponse[400](res,'Error')
            }
            
            
            const verify = await this.TOTP.verifyTOTP(inputUserCode, parseInt(id, 10));
            if(!verify.isValid) {
               return this.baseResponse.unauthorized(res,'Codigo invalido')
            }

            res.status(200).json({
                status:'Signed'
            })
            
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
