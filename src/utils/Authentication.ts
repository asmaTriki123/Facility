import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
interface Payload {
  userEmail: string,
  roleName: string,
  userId: any,
  userType: string,
  userCellPhone: string,
  companyId : any,
  userPhoto : any

}
class Authentication {
  public static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  public static async passwordCompare(
    text: string,
    encryptedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(text, encryptedText);
  }
  public static generateToken(userEmail: string, roleName: string, userId: any, userType: string, userCellPhone: string, companyId: any, userPhoto: any): string {
    const secretKey: string = process.env.JWT_SECRET_KEY || "MyKey@SuperSecret!Token";
    const payload: Payload = {
      userEmail: userEmail,
      roleName: roleName,
      userId: userId,
      userType: userType,
      userCellPhone: userCellPhone,
      companyId: companyId,
      userPhoto : userPhoto
    };
    const option = { expiresIn: process.env.JWT_EXPIRES_IN };
    return jwt.sign(payload, secretKey, option);
  }
  public static validateToken(token: string): Payload | null {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || "MyKey@SuperSecret!Token";
      return jwt.verify(token, secretKey) as Payload;
    } catch (err) {
      return null;
    }
  }
}
export default Authentication;
