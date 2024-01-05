import { HttpException, HttpStatus } from "@nestjs/common";

export class ErrorManager extends Error {

    //keyof typeof HttpStatus me da todos los nombres de las key que tiene ese enum HttpStatus
    constructor({ type, message }: { type: keyof typeof HttpStatus, message: string }) {
        super(`${type} :: ${message}`);
    }

    public static createSignatureError(message: string) {
        const name = message.split(" :: ")[0];
        if (name) {
            throw new HttpException(message, HttpStatus[name])
        } else {
            throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}