import { Router } from "express";
import { TodoDataSourceImpl } from "../../domain/infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../domain/infrastructure/repository/todo.repository.impl";
import { TodosController } from "./controller";

export class TodoRoutes {

    static get routes(): Router {

        const router = Router();

        const dataSource = new TodoDataSourceImpl();
        const todoRepository = new TodoRepositoryImpl(dataSource);
        const todoController = new TodosController(todoRepository);

        router.get('/', (req, res) => todoController.getTodos(req, res) );
        router.get('/:id', (req, res) => todoController.getById(req, res) );
        router.post('/', (req, res) => todoController.createTodo(req, res) );
        router.put('/:id', (req, res) => todoController.updateTodo(req, res) );
        router.delete('/:id', (req, res) => todoController.deleteTodo(req, res) );

        return router;

    };

};