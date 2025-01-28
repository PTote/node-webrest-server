import { Request, Response } from 'express';
import { CreateTodo, DeleteTodo, GetAllTodos, GetTodo, TodoDataRepository, UpdateTodo } from '../../domain';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDTO } from '../../domain/dtos/todos/update-todo.dto';
export class TodosController {

    constructor(
        private readonly todoRepository: TodoDataRepository
    ) { }

    public getTodos = (req: Request, res: Response) => {

        new GetAllTodos(this.todoRepository)
            .execute()
            .then(todos => res.json(todos))
            .catch(error => res.status(400).json({ error }))

    };

    public getById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    };

    public createTodo = (req: Request, res: Response) => {

        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateTodo(this.todoRepository)
            .execute(createTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    };

    public updateTodo = (req: Request, res: Response) => {
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

        new UpdateTodo(this.todoRepository)
            .execute(updateTodoDto!)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))


    };

    public deleteTodo = (req: Request, res: Response) => {

        const idParam = Number(req.params.id);

        new DeleteTodo(this.todoRepository)
            .execute(idParam)
            .then(todo => res.json(todo))
            .catch(error => res.status(400).json({ error }))

    };

};