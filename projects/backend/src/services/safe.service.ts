import { ConfigService } from "@nestjs/config";
import { createCipheriv, randomBytes, createDecipheriv, } from 'crypto';
import { Injectable } from "@nestjs/common";
import { from } from "rxjs";
import { promisify } from "util";
import { pipeline, Readable } from "stream";
import { Dict } from "~src/types/dict.type";

@Injectable()
export class SafeService {

  algorithm = 'aes-256-cbc';
  secret: Buffer;
  iv_length = 16;

  constructor(private readonly configService: ConfigService) {
    const secret = this.configService.get('SECRET_KEY');
    this.secret = Buffer.from(secret.match(/.{2}/g).map(i => parseInt(i, 16)));
  }

  /**
   * EncryptSrting
   */
  encrypt(text: string): string {
    const iv = randomBytes(this.iv_length);
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.secret), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`
  }

  /**
   * Decrypt String
   * @param text 
   */
  decrypt(text: string): string {
    const [iv, encrpytedText] = text.split(':').map(part => Buffer.from(part, 'hex'));
    const decipher = createDecipheriv(this.algorithm, Buffer.from(this.secret), iv);
    let decrypted = decipher.update(encrpytedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }

  /**
   * Encrypt Token
   */
  encryptToken(token: Dict<any>): string {
    const encrypted = this.encrypt(encodeURIComponent(JSON.stringify(token)));
    return encrypted;
  }

  /**
   * Decrypt Token
   */
  decryptToken(encryptedToken: string): Dict<any> {
    return JSON.parse(decodeURIComponent(this.decrypt(encryptedToken)));
  }

}