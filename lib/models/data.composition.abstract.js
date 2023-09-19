"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCompositionAbstract = void 0;
/** all the set operations and initialization are async, but not loadResource (only sets the current resource) */
class DataCompositionAbstract {
    constructor(docComposition, role, currentResourceIdentifier) {
        this.initialize(docComposition, currentResourceIdentifier);
    }
    /** Internal method to set the role when creating or loading a profile.
     *  Note: backend will verify the role in every HTTP call.
     */
    setRole(role) {
        this.userRole = role;
    }
    /**
     * Convert each resource in the composition to a given specification format and
     * return the array of results.
     */
    toSpecification(specification) {
        if (!this.composition.resources) {
            return [];
        }
        return this.composition.resources.map(resource => resource.toSpecification(specification));
    }
}
exports.DataCompositionAbstract = DataCompositionAbstract;
//# sourceMappingURL=data.composition.abstract.js.map