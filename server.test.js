const {
    request,
    expect,
} = require('./test.utils');
const server = require('./server');
const task = {id: 0, title: 'title 1', description: 'description 1'};

describe('test task life cycle', () => {
    it ('should add a tasks', done => {
        request
            .post(`/task/create/${task.title}/${task.description}`)
            .send()
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body).should.be.a('object');
                expect(res.body.task).to.deep.equal(task);
                expect(res.body.message).to.equal('Resource created');
                done();
            });
    });

    it ('should get tasks data', done => {
        request
            .get(`/tasks`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.tasks).should.be.a('object');
                expect(res.body.tasks[0]).to.deep.equal(task);
                expect(res.body.tasks.length).to.equal(1);
                done();
            });
    });

    it ('should get task by id', done => {
        request
            .get(`/task/${task.id}`)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                expect(res.body.task).should.be.a('object');
                expect(res.body.task).to.deep.equal(task);
                done();
            });
    })

    it ('should update task by id', done => {
        const title = 'title updated';
        const description = 'description updated';
        request
            .put(`/task/update/${task.id}/${title}/${description}`)
            .send()
            .then(res => {
                expect(res).to.have.status(201);
                expect(res.body).should.be.a('object');
                expect(res.body.task).to.deep.equal({ id: task.id, title, description });
                expect(res.body.message).to.equal('Todo Updated');
                done();
            });
    });

    it ('should delete task by id', done => {
        let theTask = null;
        request
            .get(`/tasks`)
            .end((err, res) => {
                theTask = res.body.tasks[0];
            });

        request
            .del(`/task/delete/${task.id}`)
            .then(res => {
                const { id, title, description } = theTask;
                
                expect(res).to.have.status(200);
                expect(res.body).should.be.a('object');
                expect(res.body.task).to.deep.equal({ id, title, description });
                expect(res.body.message).to.equal('Deleted successfully');
                done();
            });
    });
});

describe('test failure', () => {
    it ('should return 404 when update fails', done => {
        request
            .put(`/task/update/2/title/description`)
            .send()
            .then(res => {
                expect(res.body.message).to.equal('Not found');
                expect(res).to.have.status(404);
                done();
            });
    });

    it ('should return 404 when delete fails', done => {
        request
            .del(`/task/delete/2`)
            .then(res => {
                expect(res.body.message).to.equal('Not found');
                expect(res).to.have.status(404);
                done();
            });
    });
});