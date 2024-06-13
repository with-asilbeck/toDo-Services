const db = [];

const ToDoService = {
    Create: async (call, callback) => {
        try {
            const newData = call.request;
            db.push(newData);
            callback(null, { id: String(db.length - 1) });
        } catch (error) {
            callback(error);
        }
    },

    Get: async (call, callback) => {
        try {
            const id = parseInt(call.request.id, 10);
            if (id >= 0 && id < db.length) {
                const response = db[id];
                response.id = call.request.id;
                callback(null, response);
            } else {
                callback({
                    code: grpc.status.NOT_FOUND,
                    details: "Not Found",
                });
            }
        } catch (error) {
            callback({
                code: grpc.status.INTERNAL,
                details: error.message,
            });
        }
    },
};

module.exports = ToDoService;
