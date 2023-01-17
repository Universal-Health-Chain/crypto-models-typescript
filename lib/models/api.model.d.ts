/** NOTES:
 * The summary of codes is added by the API when reading a resource (instead of duplicating data on blockchain).
 * Metadata provides technical and workflow context to the resource.
 * The 'source' property is overwritted with the performer practitionerRoleId by the smart contract.
 * (instead of removing 'source' and creating another 'performer' property).
 */
/** JSON-API common data */
export interface CommonDataAPI {
    id?: string;
    type?: any;
}
/** Error objects provide additional information about problems encountered while performing an operation. Error objects MUST be returned as an array keyed by errors in the top level of a JSON:API document.
 *  An error object MAY have the following members:
 *  - id: a unique identifier for this particular occurrence of the problem.
 *  - links: a links object containing the following members:
 *      -- about: a link that leads to further details about this particular occurrence of the problem.
 *  - status: the HTTP status code applicable to this problem, expressed as a string value.
 *  - code: an application-specific error code, expressed as a string value.
 *  - title: a short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.
 *  - detail: a human-readable explanation specific to this occurrence of the problem. Like title, this field’s value can be localized.
 *  - source: an object containing references to the source of the error, optionally including any of the following members:
 *      -- pointer: a JSON Pointer [RFC6901] to the associated entity in the request document [e.g. "/data" for a primary data object, or "/data/attributes/title" for a specific attribute].
 *      -- parameter: a string indicating which URI query parameter caused the error.
 *  - meta: a meta object containing non-standard meta-information about the error.
 */
export interface ErrorAPI {
    status?: string;
    code?: string;
}
/** https://jsonapi.org/format/#crud-creating-responses
 *  POST Responses:
 *  - 200 OK: an update that also changes the resource(s) in ways other than those specified by the request (for example, updating the updated-at attribute or a computed sha. The response document MUST include a representation of the updated resource(s) as if a GET request was made to the request URL.
 *  - 201 Created: The response SHOULD include a Location header identifying the location of the newly created resource.
 *  - 202 Accepted: If a request to create, update or delete a resource has been accepted for processing, but the processing has not been completed by the time the server responds.
 *  - 204 No Content is the same as 201 Created or 200 OK but with no response document.
 *  - 403 Forbidden: unsupported request.
 *  - 404 Not Found: the related resource that does not exist.
 *  - 409 Conflict: the ID already exists.
 *
 *  In the following example, the comment with ID 123 is added to the list of comments for the article with ID 1:
 *  POST /articles/1/relationships/comments HTTP/1.1
 *  Content-Type: application/vnd.api+json
 *  Accept: application/vnd.api+json
 *  {"data": [{"type": "comments", "id": "123"}] }
 *
 *  For example, the following request replaces every tag for an article:
 *  PATCH /articles/1/relationships/tags HTTP/1.1
 *  {"data":[ {"type": "tags", "id": "2" }, { "type": "tags", "id": "3" } ]}
 */
export interface ResponseAPI {
    data: object[];
    included?: object[];
}
