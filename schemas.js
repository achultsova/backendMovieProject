"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.optsRegist = exports.opts = void 0;
exports.opts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                }
            }
        }
    }
};
exports.optsRegist = {
    schema: {
        response: {
            201: {
                type: 'object',
                properties: {
                    username: {
                        type: 'string'
                    },
                    email: {
                        type: 'string'
                    },
                    mobile: {
                        type: 'string'
                    },
                    age: {
                        type: 'string'
                    },
                    password: {
                        type: 'string'
                    },
                }
            }
        }
    }
};
