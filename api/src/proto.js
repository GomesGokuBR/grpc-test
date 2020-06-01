const grpc = require('grpc');

const loaderConfig = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
};

var hydraDef = protoLoader.loadSync(
    path.resolve(__dirname, 'pb', 'hydra.proto'),
    loaderConfig
);

const hydra = grpc.loadPackageDefinition(hydraDef);