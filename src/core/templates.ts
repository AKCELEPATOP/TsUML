import {PropertyDetails, MethodDetails} from "./interfaces";

const LINE_SEPARATOR = ";";

const buildEntity = (name: string, props: PropertyDetails[], methods: MethodDetails[], color?: Function) => {
    let entity = "";
    if (color) {
        entity += color(name);
    } else {
        entity += name;
    }

    if (props.length) {
        entity += `|${props.map(templates.property).join(LINE_SEPARATOR)}`;
    } else if(methods.length){
        entity += `| `;
    }

    if (methods.length) {
        entity += `|${methods.map(templates.method).join(LINE_SEPARATOR)}`;
    } else {
        entity += `|`;
    }

    return `[${entity}]`;
};

export const templates = {
    composition: "+->",
    implementsOrExtends: (abstraction: string, implementation: string) => {
        return (
            `${templates.plainClassOrInterface(abstraction)}` +
            `^-${templates.plainClassOrInterface(implementation)}`
        );
    },
    plainClassOrInterface: (name: string) => `[${name}]`,
    colorClass: (name: string) => `${name}{bg:skyblue}`,
    colorInterface: (name: string) => `${name}{bg:palegreen}`,
    property: (property: PropertyDetails) => property.name,
    method: (method: MethodDetails) => `${method.name}()`,
    class: (
        name: string,
        props: PropertyDetails[],
        methods: MethodDetails[]
    ) => buildEntity(name, props, methods, templates.colorClass),
    interface: (
        name: string,
        props: PropertyDetails[],
        methods: MethodDetails[]
    ) => buildEntity(name, props, methods, templates.colorInterface),
};
