import app from '../src/app';
import request from 'supertest';

describe('POST /student/save',() => {
    let user = {
        name:'Eduardo',
        last_name:'Catalan',
        email:'marvineduardocv12@gmail.com',
        birth_date:'20010731',
        password:'C0d3c_7',
        confirm_password:'C0d3c_7'
    };

    test('Should respond with a 200 status code',async () => {
        const response = await request(app).post('/student/save').send(user);
        expect(response.statusCode).toBe(200);
    })

    test('Should have a contet-type: application/json in headers', async () => {
        const response = await request(app).post('/student/save').send(user);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })

    test('Should respond with a 400 status code because the passwords do not match',async () => {
        user.confirm_password = 'pass'
        const response = await request(app).post('/student/save').send(user);
        expect(response.statusCode).toBe(400);
    })

    test('Should respond with id_student ', async () => {
        user.confirm_password='C0d3c_7';
        const response = await request(app).post('/student/save').send(user);
        expect(response.body.id_student).toBeDefined();
    })
});

describe('POST /login',() =>{
    let credentials = {
        email:'marvineduardocv12@gmail.com',
        password:'C0d3c_7'
    };

    test('Should respond with a 200 status code',async () => {
        const response = await request(app).post('/login').send(credentials);
        expect(response.statusCode).toBe(200);
    })

    test('Should have a contet-type: application/json in headers', async () => {
        const response = await request(app).post('/login').send(credentials);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })

    test('Should respond with a 400 status code', async () => {
        const response = await request(app).post('/login').send({
            email:null,
            password:null
        });
        expect(response.statusCode).toBe(400);
    })
})

describe('POST /student/course-assignment',() =>{
    let params = {
        id_student:'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
        course:'math',
        section:'A',
        day:'monday',
        time_course:'16:00'
    };

    test('Should respond with a 200 status code',async () => {
        const response = await request(app).post('/student/course-assignment').send(params);
        expect(response.statusCode).toBe(200);
    })

    test('Should have a contet-type: application/json in headers', async () => {
        const response = await request(app).post('/student/course-assignment').send(params);
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    })

    test('Should respond with id_assignment ', async () => {
        const response = await request(app).post('/student/course-assignment').send(params);
        expect(response.body.id_assignment).toBeDefined();
    })

    test('Should respond with a 400 status code', async () => {
        params.day = null;
        const response = await request(app).post('/student/course-assignment').send(params);
        expect(response.statusCode).toBe(400);
    })
})
