import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy bread', createdAt: new Date() },
    { id: 3, text: 'Buy butter', createdAt: new Date() },
];

export class TodosController {

    constructor() { }

    public getTodos = (req: Request, res: Response) => {
        res.json(todos);
    };

    public getById = (req: Request, res: Response) => {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            res.status(404).json({ error: `ID argument is not a number` });
            return;
        }
        const todo = todos.filter(element => element.id === id);

        (todo.length > 0)
            ? res.json(todo)
            : res.status(404).json({ error: `TODO WITH id ${id} NOT FOUND` })

    };

    public createTodo = (req: Request, res: Response) => {

        const body = req.body;

        if (!body.id) {
            const getLastId = todos[todos.length - 1]
            body.id = getLastId.id++;
        }

        if (!body.createdAt) {
            body.createdAt = new Date();
        }

        todos.push(body);
        res.json(body)


    };

    public updateTodo = (req: Request, res: Response) => {

        let { id, text, createdAt } = req.body ?? {};
        const idParam = Number(req.params.id);

        console.log(text);

        if (!idParam) {
            res.status(400).json({ error: 'you need provide an ID' });
            return;
        };

        if (!text) {
            res.status(400).json({ error: 'text not found' });
            return;
        };

        if (!createdAt) {
            createdAt = new Date();
        }

        const todo = todos.find( todo => todo.id === idParam);

        if(!todo){
            res.status(400).json({ error: 'ID not found' });
        }else{
            todo.text = text;
            todo.createdAt = createdAt;
        }

        console.log(todos);
        res.json(req.body)


    };

    public deleteTodo = (req: Request, res: Response) => {

        const idParam = Number(req.params.id);

        if (isNaN(idParam)) {
            res.status(404).json({ error: `ID argument is not a number` });
            return;
        }

        const todoIndex = todos.findIndex( todo => todo.id === idParam);

        if(todoIndex === -1){
            res.status(400).json({ error: 'ID not found' });
        }else{

            todos.splice(todoIndex, 1);
            console.log(todos);
            res.json(todos);

        }



    };

};