"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const http_1 = __importDefault(require("http"));
const Schema_js_1 = require("./Schema.js");
const resolvers_1 = require("./resolvers");
const config_1 = __importDefault(require("./config"));
const models_1 = __importDefault(require("./models"));
const port = 3000;
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const server = new server_1.ApolloServer({
    typeDefs: Schema_js_1.typeDefs,
    resolvers: resolvers_1.resolvers,
});
server.start().then(() => {
    app.use("/api", (0, cors_1.default)(), body_parser_1.default.json(), body_parser_1.default.urlencoded({
        extended: true,
    }), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            token: req.headers.token;
            const db = config_1.default;
            return { db, models: models_1.default };
        },
    }));
});
httpServer.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api`);
});
//# sourceMappingURL=index.js.map