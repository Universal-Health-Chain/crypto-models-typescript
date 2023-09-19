export type ParameterType = 'number' | 'date' | 'string' | 'token' | 'reference' | 'composite' | 'quantity' | 'uri' | 'period';

export interface Parameter {
    name: string;
    type: ParameterType;
    value: any;
    system?: string;
    unit?: string;
    end?: string;
    period?: boolean;
    description?: string;
    optionsList?: any[];
    base?: string[];
}

export abstract class ParamsAbstract {
    protected parameters: Parameter[] = [];

    clean(): void {
        this.parameters = [];
    }

    abstract get(paramName: string): Parameter | undefined;
    abstract set(paramData: Parameter): void;
}