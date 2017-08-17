"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressPresenter_1 = require("jscommons/dist/expressPresenter");
var deleteProfile_1 = require("./deleteProfile");
var getFullAgent_1 = require("./getFullAgent");
var getProfiles_1 = require("./getProfiles");
var postProfile_1 = require("./postProfile");
var putProfile_1 = require("./putProfile");
exports.default = function (config) {
    var router = expressPresenter_1.default(config);
    router.delete('/xAPI/agents/profile', deleteProfile_1.default(config));
    router.get('/xAPI/agents/profile', getProfiles_1.default(config));
    router.put('/xAPI/agents/profile', putProfile_1.default(config));
    router.post('/xAPI/agents/profile', postProfile_1.default(config));
    router.get('/xAPI/agents', getFullAgent_1.default(config));
    return router;
};
//# sourceMappingURL=index.js.map