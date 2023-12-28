type OkResponseDto = {
    message: string;
    data?: any;
}

export class Ok {
    message: string;
    data?: any;
    success: boolean;
    
    constructor({ message, data }: OkResponseDto) {   
        this.success = true;
        this.message = message;
        data && (this.data = data);
    }
}