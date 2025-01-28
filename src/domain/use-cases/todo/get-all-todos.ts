import { TodoEntity } from "../../entities/todo.entity";
import { TodoDataRepository } from "../../repositories/todo.repository";

export interface GetAllTodosUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetAllTodos implements GetAllTodosUseCase {

    constructor(
        private readonly repository: TodoDataRepository
    ) { }

    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }
}