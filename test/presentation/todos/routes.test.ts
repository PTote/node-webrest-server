import request from 'supertest';
import { prisma } from '../../../src/data/postgres';
import { testServer } from '../../test-server';


describe('Todo route testing', () => {

    beforeAll(async () => {
        await testServer.start();
    });

    afterAll(() => testServer.close());

    beforeEach(async () =>{
        await prisma.todo.deleteMany();
    });

    const todo1 = { text: 'Hola mundo 1'};
    const todo2 = { text: 'Hola mundo 2'};

    test('should return TODOS', async () => {

        await prisma.todo.createMany({
            data: [todo1, todo2]
        })

    const {body} = await request(testServer.app)
    .get('/api/todos')
    .expect(200);


    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);


    });


    test('should return a TODO api/todos/:id', async () => {

    const todo = await prisma.todo.create({ data: todo1})

    const {body} = await request(testServer.app)
    .get(`/api/todos/${todo.id}`)
    .expect(200)

    expect(body.id).toEqual(todo.id);
    expect(body.text).toEqual(todo.text);


    });

    test('should return a 404 not found api/todos/:id', async ()=> {

        const id = 999;
        const findTodo = await prisma.todo.findUnique({where: {id}})

        if(findTodo){
           await prisma.todo.delete({where: { id }});
        }

        const {body} = await request(testServer.app)
        .get(`/api/todos/${id}`)
        .expect(400)
        
        expect(body.error).toBeTruthy();
        expect(body.error).toEqual(`TODO with ${id} not found`);
    

    });

    test('should return a new TODO api/todos', async () => {
        const {body} = await request(testServer.app)
        .post('/api/todos')
        .send(todo1)
        .expect(200)

        expect(body.text).toEqual(todo1.text)
    });

});