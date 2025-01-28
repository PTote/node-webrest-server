import { TodoDataSource } from "../../datasources/todo.datasource";
import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export class TodoRepositoryImpl implements TodoDataRepository {


    constructor(
        private readonly dataSource: TodoDataSource
    ){}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.dataSource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.dataSource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.dataSource.findById(id);
    }
    updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        return this.dataSource.updateById(updateTodoDTO);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.dataSource.deleteById(id);
    }

}