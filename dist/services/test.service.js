"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const test_model_1 = require("../models/test.model");
class TestService {
    async createTest(test_data) {
        return (await test_model_1.Test.create(test_data));
    }
}
exports.TestService = TestService;
//# sourceMappingURL=test.service.js.map