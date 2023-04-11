"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodHTTP = exports.PrimaryDocType = void 0;
var PrimaryDocType;
(function (PrimaryDocType) {
    PrimaryDocType["batch"] = "batch";
    PrimaryDocType["collection"] = "collection";
    PrimaryDocType["document"] = "document";
    PrimaryDocType["transaction"] = "transaction";
})(PrimaryDocType = exports.PrimaryDocType || (exports.PrimaryDocType = {}));
var MethodHTTP;
(function (MethodHTTP) {
    MethodHTTP["create"] = "POST";
    MethodHTTP["delete"] = "DELETE";
    MethodHTTP["read"] = "GET";
    MethodHTTP["update"] = "PUT"; // it can be used to create a resource with a given ID.
})(MethodHTTP = exports.MethodHTTP || (exports.MethodHTTP = {}));
