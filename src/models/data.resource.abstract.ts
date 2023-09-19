import { Parameter, ParamsAbstract } from "./data.params.abstract";

export abstract class ResourceAbstract {
    protected fullUrl?: string;
    protected meta?: any;
    protected abstract parameters: ParamsAbstract;

    constructor(resourceType: string, subject: string, identifier?: string) {
        this.initialize(resourceType, subject, identifier);
    }

    clean(): void {
        this.fullUrl = '';
        this.meta = undefined;
        this.parameters.clean();
    }
    abstract initialize(resourceType: string, subject: string, identifier?: string): void;
    abstract getParameter(paramName: string): Parameter | undefined;
    abstract setParameter(paramData: Parameter): void;
    abstract getFullUrl(): string | undefined;
    abstract setFullUrl(url: string): void;
    abstract getType(): string | undefined;
    abstract getIdentifier(): string | undefined;
    
    /** Method to convert the resource to a given specification format */
    abstract toSpecification(specification: string): any;    
}