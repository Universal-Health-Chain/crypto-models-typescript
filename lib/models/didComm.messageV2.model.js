"use strict";
/* Copyright (c) ConnectHealth Group (Conéctate Soluciones y Aplicaciones SL, Connecting Solutions & Applications Ltd.) */
/* Apache License 2.0 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeAcceptsDIDCommV2 = void 0;
exports.TypeAcceptsDIDCommV2 = "didcomm/v2";
/*

{
    "type": "<sometype>",
    "to": ["did:example:mediator"],
    "body":{
        "attachment_id": "1",
        "encrypted_details": {
            "id": "x",
            "encrypted_to": "",
            "other_details": "about attachment"
        }
    },
    "attachments": [
        {
            "id": "1",
            "description": "example b64 encoded attachment",
            "data": {
                "base64": "WW91ciBob3ZlcmNyYWZ0IGlzIGZ1bGwgb2YgZWVscw=="
            }
        },{
            "id": "2",
            "description": "example linked attachment",
            "data": {
                "hash": "<multi-hash>",
                "links": ["https://path/to/resource"]
            }
        },{
            "id": "x",
            "description": "example encrypted DIDComm message as attachment",
            "media_type": "application/didcomm-encrypted+json",
            "data": {
                "json": {
                    //jwe json structure
                }
            }
        }
    ]
}


*/ 
//# sourceMappingURL=didComm.messageV2.model.js.map