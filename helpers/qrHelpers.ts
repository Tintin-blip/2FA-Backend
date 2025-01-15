import qrCode from 'qrcode'

export class QR { 
    constructor() {}

    public async createQr(secret:string) { 

        const qrUrl = `otpauth://totp/Dashboard:admin@test.com?secret=${secret}&algorithm=SHA1&digits=6&issuer=2FAexample&period=30`

     
        try {
          const imageQr = await qrCode.toDataURL(qrUrl); 
          
          return imageQr;
        } catch (err) {
          throw new Error('Error generating QR code');
        }
    }
}