export class ComponentEditorModel {
    uid: string;

    description: string;

    isEnabled: boolean = true;

    appCaption: string;

    appImageId: string = "fas fa-square";

    appImageColor: string = "#00FFFF";

    appPositionIndex: number = 0;

    logicId: string;

    logicVersion: string;

    logicConfiguration: string;

    adapterId: string;

    adapterVersion: string;

    adapterConfiguration: string;

    excludeFromHistory: string;

    initializeComponent: boolean;
}