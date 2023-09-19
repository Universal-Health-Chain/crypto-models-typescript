"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceAbstract = void 0;
class ResourceAbstract {
    constructor(resourceType, subject, identifier) {
        this.initialize(resourceType, subject, identifier);
    }
    clean() {
        this.fullUrl = '';
        this.meta = undefined;
        this.parameters.clean();
    }
}
exports.ResourceAbstract = ResourceAbstract;
//# sourceMappingURL=data.resource.abstract.js.map