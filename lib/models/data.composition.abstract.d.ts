import { ResourceAbstract } from "./data.resource.abstract";
import { MetaDataComposition } from "./data.storage.model";
/** Message or Document Composition */
export interface DataCompositionBase {
    author: string;
    subject: string;
    date?: Date;
    "_deleted"?: boolean;
    "_rev"?: string;
    "_id"?: string;
    id?: string;
    identifier?: string;
    indexed?: any;
    meta?: MetaDataComposition;
    messageFocus?: string;
    messageReason?: string;
    messageStatus?: string | 'read' | 'unread';
    resources?: Array<ResourceAbstract>;
    title?: string;
}
/** all the set operations and initialization are async, but not loadResource (only sets the current resource) */
export declare abstract class DataCompositionAbstract {
    protected abstract composition: DataCompositionBase;
    protected abstract currentResource: any | undefined;
    protected abstract userRole: string;
    constructor(docComposition: DataCompositionBase, role?: string | 'personal', currentResourceIdentifier?: string);
    /** Internal method to set the role when creating or loading a profile.
     *  Note: backend will verify the role in every HTTP call.
     */
    setRole(role: string): void;
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
    toSpecification(specification: string): any[];
}
