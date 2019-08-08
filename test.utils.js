const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

const request = chai.request('http://localhost:9001');

exports.request = request;
exports.chaiHttp = chaiHttp;
exports.expect = expect;