"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTestSchema = void 0;
const zod_1 = require("zod");
exports.createTestSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        id: (0, zod_1.number)().optional(),
        name: (0, zod_1.string)({
            required_error: 'Farm name is required',
        }),
        role: (0, zod_1.string)(),
        address: (0, zod_1.string)({
            required_error: 'Farm location is required',
        }),
    })
});
//# sourceMappingURL=test.schema.js.map