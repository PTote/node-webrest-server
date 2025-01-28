import { Request, Response } from 'express';
import { TodoDataRepository } from '../../domain';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: new Date() },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
];

export class TodosController {

    constructor(
        private readonly todoRepository: TodoDataRepository
    ) { }

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    };

    public getById = async (req: Request, res: Response) => {
        const id = Number(req.params.id);

        try {
        const todo = await this.todoRepository.findById(id);
        res.json(todo);
            
        } catch (error) {
            res.status(400).json({error});
        }

    };

    public createTodo = async (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        const todo = await this.todoRepository.create(createTodoDto!);
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




        if (error) {
            res.status(400).json({ error });
            return;
        }

        const updateTodo = await this.todoRepository.updateById(updateTodoDto!);
        res.json(updateTodo);


    };

    public deleteTodo = async (req: Request, res: Response) => {

        const idParam = Number(req.params.id);

        const deleted = await this.todoRepository.deleteById(idParam);
        res.json(deleted);

    };

};