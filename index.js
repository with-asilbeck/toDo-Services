const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const ToDoService = require('./services/todo');

const PROTO_PATH = __dirname + '/protos/toDoService.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: String,
    oneofs: true,
});

const protoDescription = grpc.loadPackageDefinition(packageDefinition);
const toDo = protoDescription.toDo;

const server = new grpc.Server();

server.addService( toDo.ToDoService.service, ToDoService );

server.bindAsync(
    '0.0.0.0:3001',
    grpc.ServerCredentials.createInsecure(),
    (err, result) => {
        server.start();
    }
);
console.log("server started");