import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { GlobalVariableModel } from './model/global-variable.model';
import { DataType } from '../shared/models/data-type.model';

@Component({
    selector: 'app-global-variables',
    templateUrl: './global-variables.component.html',
    styleUrls: ['./global-variables.component.css']
})

export class GlobalVariablesComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    globalVariableTypes = DataType;

    globalVariableItems: GlobalVariableModel[]

    editorType: DataType = DataType.String;

    editorUid: string;

    editorStringValue: string;

    editorNumberValue: number;

    editorBooleanValue: boolean = false;

    ngOnInit() {
        this.updateGlobalVariables();
    }

    updateGlobalVariables() {
        this.apiService.getGlobalVariables().subscribe(items => {
            var itemsModel = new Array<GlobalVariableModel>();

            for (let property in items) {

                let value = items[property];

                let item = new GlobalVariableModel();
                item.uid = property;
                item.value = value;
                item.type = this.convertType(value)

                itemsModel.push(item);
            }

            itemsModel.sort((x, y) => x.uid < y.uid ? - 1 : 1);

            this.globalVariableItems = itemsModel
        });
    }

    editGlobalVariable(item: GlobalVariableModel)
    {
        this.editorUid = item.uid;
        this.editorType = item.type;
        this.editorStringValue = item.value;
        this.editorNumberValue = item.value;
        this.editorBooleanValue = item.value;
    }

    deleteGlobalVariable(item: GlobalVariableModel) {
        this.apiService.deleteGlobalVariable(item.uid).subscribe(_ => this.updateGlobalVariables());
    }

    postGlobalVariable() {
        let value;

        if (this.editorType == DataType.String) {
            value = `'${this.editorStringValue}'`;
        }
        else if (this.editorType == DataType.Number) {
            value = this.editorNumberValue;
        }
        else if (this.editorType == DataType.Boolean) {
            value = this.editorBooleanValue;
        }
        else if (this.editorType == DataType.Null) {
            value = null;
        }

        this.apiService.postGlobalVariable(this.editorUid, value).subscribe(_ => this.updateGlobalVariables());
    }

    typeToString(type: DataType): string {
        switch (type) {
            case DataType.String:
                {
                    return "string";
                }

            case DataType.Number:
                {
                    return "number";
                }

            case DataType.Boolean:
                {
                    return "boolean";
                }

            case DataType.Null:
                {
                    return "null";
                }

            default:
                {
                    return "<not supported>";
                }
        }
    }

    private convertType(value: any): DataType {
        switch (typeof (value)) {
            case "string":
                {
                    return DataType.String;
                }

            case "number":
                {
                    return DataType.Number;
                }

            case "boolean":
                {
                    return DataType.Boolean;
                }

            default:
                {
                    return DataType.Null;
                }
        }
    }
}
