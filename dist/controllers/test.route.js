"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestHandler = void 0;
const test_service_1 = require("../services/test.service");
const testService = new test_service_1.TestService();
const createTestHandler = async (req, res, next) => {
    try {
        const test = await testService.createTest({
            name: req.body.name,
            address: req.body.address,
            role: req.body.role,
        });
        return res.status(201).json({
            status: "Success",
            data: test
        });
    }
    catch (err) {
        return res.status(409).json({
            status: 'fail',
            message: err
        });
        next(err);
    }
};
exports.createTestHandler = createTestHandler;
//# sourceMappingURL=test.route.js.map