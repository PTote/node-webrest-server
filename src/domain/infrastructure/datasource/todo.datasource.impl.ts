import { prisma } from "../../../data/postgres";
import { TodoDataSource } from "../../datasources/todo.datasource";
import { CreateTodoDto } from "../../dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";

export class TodoDataSourceImpl implements TodoDataSource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data: createTodoDto!
        })

        return TodoEntity.fromObject(todo);
    }


    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromObject(todo));
    };

    async findById(id: number): Promise<TodoEntity> {
        const todos = await prisma.todo.findUnique({
            where: {
                id
            }
        });

        if(!todos) throw `TODO with ${id} not found`;
        return TodoEntity.fromObject(todos);

    };

    async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {

        await this.findById(updateTodoDTO.id);
        const updateTodo = await prisma.todo.update({
            where: { id: updateTodoDTO.id },
            data: updateTodoDTO!.values
        });

        return TodoEntity.fromObject(updateTodo);

        
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById(id);
        const deleted = await prisma.todo.delete({
            where: { id}
        })

        return TodoEntity.fromObject(deleted)
    };

}