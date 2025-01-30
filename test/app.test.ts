import { Server } from "../src/presentation/server";

jest.mock('../src/presentation/server');

describe('Testing App.ts', () => {


    test('should work server start with arguments', async () => {

        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        
    })

});