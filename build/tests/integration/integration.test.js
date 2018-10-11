"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
const helpers_1 = require("./config/helpers");
describe('Testes de Integração', () => {
    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');
    let id;
    const userTest = {
        id: 100,
        name: 'Usuário Teste',
        email: 'teste@email.com',
        password: 'teste'
    };
    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };
    beforeEach((done) => {
        model.User.destroy({
            where: {}
        })
            .then(() => {
            return model.User.create(userDefault);
        })
            .then(user => {
            model.User.create(userTest)
                .then(() => {
                done();
            });
        });
    });
    describe('GET /api/users/all', () => {
        it('Deve retornar um Array com todos os Usuários', done => {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end((error, res) => {
                /*console.log(error);*/
                /*console.log(res);*/
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    /*
        describe('GET /api/users/:id', () => {
            it('Deve retornar um Array com apenas um Usuário', done => {
                request(app)
                    .get(`/api/users/${userDefault.id}`)
                    .end((error, res) => {
                        expect(res.status).to.equal(HTTPStatus.OK);
                        expect(res.body.payload.id).to.equal(userDefault.id);
                        expect(res.body.payload).to.have.all.keys([
                            'id', 'name', 'email', 'password'
                        ]);
                        id = res.body.payload.id;
                        done(error);
                    });
            });
        });
    
        describe('POST /api/users/create', () => {
            it('Deve criar um novo Usuário', done => {
                const user = {
                    id: 2,
                    name: 'Usuário Teste',
                    email: 'usuario@email.com',
                    password: 'novouser'
                }
                request(app)
                    .post('/api/users/create')
                    .send(user)
                    .end((error, res) => {
                        expect(res.status).to.equal(HTTPStatus.OK);
                        expect(res.body.payload.id).to.equal(user.id);
                        expect(res.body.payload.name).to.equal(user.name);
                        expect(res.body.payload.email).to.equal(user.email);
                        done(error);
                    });
            });
        });
    
        describe('PUT /api/users/:id/update', () => {
            it('Deve atualizar um Usuário', done => {
                const user = {
                    id: userTest.id,
                    name: 'TesteUpdate',
                    email: 'update@email.com'
                }
                request(app)
                    .put(`/api/users/${userTest.id}/update`)
                    .send(user)
                    .end((error, res) => {
                        expect(res.status).to.equal(HTTPStatus.OK);
                        expect(res.body.payload.id).to.equal(user.id);
                        expect(res.body.payload.name).to.equal(user.name);
                        expect(res.body.payload.email).to.be.equal(user.email);
                        done(error);
                    });
            });
        });
    
        describe('DELETE /api/users/:id/destroy', () => {
            it('Deve deletar um Usuário', done => {
                const user = {
                    id: userTest.id,
                    name: 'TesteUpdate',
                    email: 'update@email.com'
                }
                request(app)
                    .delete(`/api/users/${user.id}/destroy`)
                    .end((error, res) => {
                        expect(res.status).to.equal(HTTPStatus.OK);
                        expect(res.body.payload).to.equal(user.id);
                        done(error);
                    });
            });
        });
        */
});
