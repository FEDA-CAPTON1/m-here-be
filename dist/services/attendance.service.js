"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const test_model_1 = require("../models/test.model");
class TestService {
    async createTest(data) {
        return (await test_model_1.Test.create(data));
    }
}
exports.TestService = TestService;
//# sourceMappingURL=attendance.service.js.map