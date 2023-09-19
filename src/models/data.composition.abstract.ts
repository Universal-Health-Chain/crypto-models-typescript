import { ResourceAbstract } from "./data.resource.abstract";
import { MetaDataComposition } from "./data.storage.model";

/** Message or Document Composition */
export interface DataCompositionBase {
    author: string;
    subject: string;
    date?: Date;
    "_deleted"?:    boolean;                // internal PouchDB / CouchDB when deleting a document.
    "_rev"?:        string;                 // internal PouchDB / CouchDB version ID (automatically generated).
    "_id"?:         string;                 // internal PouchDB / CouchDB / MongoDB object ID, distinct to the external record "id".
    id?:            string;                 // external EDV record ID (16 bits), it can be generated deterministically.
    identifier?:    string;
    indexed?:       any;                    // safe or unsafe index of attributes (`name` and `value`).
    meta?:          MetaDataComposition;  // "created" and "status" are required
    messageFocus?:  string;                 // it can be the parent thread ID, an encounter ID, a connection ID...
    messageReason?: string;
    messageStatus?: string | 'read' | 'unread'; // for internal use
    resources?:     Array<ResourceAbstract>;
    title?:         string;
}

/** all the set operations and initialization are async, but not loadResource (only sets the current resource) */
export abstract class DataCompositionAbstract {
    protected abstract composition: DataCompositionBase;
    protected abstract currentResource: any | undefined;
    protected abstract userRole: string;


    constructor(docComposition: DataCompositionBase, role?: string | 'personal', currentResourceIdentifier?: string) {
        this.initialize(docComposition, currentResourceIdentifier);
    }

    /** Internal method to set the role when creating or loading a profile.
     *  Note: backend will verify the role in every HTTP call.
     */
    public setRole(role:string) {
        this.userRole = role;
    }

    abstract initialize(docComposition: DataCompositionBase, currentResourceIdentifier?: string): Promise<void>;
    abstract createResource(resourceType: string, subject: string, identifier?: string): Promise<any>;
    abstract getResourcesByType(resourceType: string): Array<any> | undefined;
    abstract loadResource(identifier: string): any | undefined;
    abstract getCurrentResourceIdentifier(): string;
    abstract saveResource(resource: any): Promise<void>;
    abstract getAllResources(): Array<any>;
    abstract getKind(): string | undefined;
    abstract setKind(kind: string): Promise<void>;
    abstract getTitle(): string | undefined;
    abstract setTitle(title: string): Promise<void>;
    abstract getDate(): Date | undefined;
    abstract setDate(date: Date): Promise<void>;
    abstract getStatus(): string | undefined;
    abstract setStatus(status: 'draft' | 'final' | string): Promise<void>;
    abstract getAuthor(): string;
    abstract setAuthor(author: string): Promise<void>;
    abstract getSubject(): string;
    abstract setSubject(subject: string): Promise<void>;
    abstract getIdentifier(): string | undefined;
    abstract setIdentifier(identifier: string): Promise<void>;
    
    /** 
     * Convert each resource in the composition to a given specification format and 
     * return the array of results.
     */
    toSpecification(specification: string): any[] {
        if (!this.composition.resources) {
            return [];
        }
        return this.composition.resources.map(resource => resource.toSpecification(specification));
    }    
}
