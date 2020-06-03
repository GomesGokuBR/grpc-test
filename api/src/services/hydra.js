const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const loaderConfig = require('../config/proto')

var hydraDef = protoLoader.loadSync(
    path.resolve(__dirname, '..', 'pb', 'hydra.proto'),
    loaderConfig
);

const hydra = grpc.loadPackageDefinition(hydraDef);

const hydraClient = new hydra.UserService('localhost:3334', grpc.credentials.createInsecure());

module.exports = hydraClient;