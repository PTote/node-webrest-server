import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: new Date() },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
];

export class TodosController {

    constructor() { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany()
        res.json(todos);
    };

    public getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        const todos = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        res.json(todos);

    };

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        
        if(error){
            res.status(400).json({error});
            return;
        }

            const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        res.json(todo)

    };

    public updateTodo = async (req: Request, res: Response) => {
        let { text, createdAt } = req.body ?? {};
        const idParam = Number(req.params.id);



        const [error, updateTodoDto] = new UpdateTodoDTO(
            idParam, 
            text, 
            createdAt
        ).update();

        


        if(error){
            res.status(400).json({error});
            return;   
        }

        if(!updateTodoDto){
            res.status(400).json({error});
            return;      
        }


        const todo = await prisma.todo.update({
            where: { id: idParam },
            data: updateTodoDto.values
        })

        res.json(todo)


    };

    public deleteTodo = async (req: Request, res: Response) => {

        const idParam = Number(req.params.id);

        const todos = await prisma.todo.delete({
            where: { id: idParam}
        })

        res.json(todos);

    };

};