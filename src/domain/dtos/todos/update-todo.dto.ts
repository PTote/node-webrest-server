export class UpdateTodoDTO {

    public id: number;
    private text?: string | undefined;
    private createdAt?: Date | undefined;

    constructor(
        id: any,
        text: string | undefined,
        createdAt: Date | undefined,
    ){
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
    }

    update(): [string?, UpdateTodoDTO?] {


        if(isNaN(Number(this.id)) || !this.id){
            return ['id must be a valid number', undefined];
        }

        if(this.createdAt){
            const newCompletedAt = new Date(this.createdAt);
            if(newCompletedAt.toString() === 'Invalid Date'){
               return ['CompletedAt must be a valid date', undefined]; 
            }
        }

        return [undefined, new UpdateTodoDTO(this.id, this.text, this.createdAt)]


    }


    get values(){
        const returnObj: {[key: string]: any} = {};

        if(this.text) returnObj.text = this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;

    }


}