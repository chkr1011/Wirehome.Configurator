import { ApiService } from 'src/app/api/api.service';
import { ComponentEditorModel } from '../model/component-editor-model';
import { Observable, forkJoin } from 'rxjs';

export class ComponentUpdater {
    constructor(private apiService: ApiService) {

    }

    updateComponent(configuration: ComponentEditorModel) : Observable<object>
    {
        let finalConfiguration = {
            "isEnabled": configuration.isEnabled,
            "logic": {
                "uid": {
                    "id": configuration.logicId,
                    "version": configuration.logicVersion
                },
                "variables": JSON.parse(configuration.logicConfiguration)
            },
            "adapter": {
                "uid": {
                    "id": configuration.adapterId,
                    "version": configuration.adapterVersion
                },
                "variables": JSON.parse(configuration.adapterConfiguration)
            }
        }

        let finalSettings = {
            "app.caption": configuration.appCaption,
            "app.image_id": configuration.appImageId,
            "app.image_color": configuration.appImageColor,
            "app.position_index": configuration.appPositionIndex
        }

        let postConfiguration = this.apiService.postComponentConfiguration(configuration.uid, finalConfiguration);
        let postSettings = this.apiService.postComponentConfiguration(configuration.uid, finalSettings);

        let operations = [postConfiguration, postSettings]

        if (configuration.initializeComponent)
        {
            let postInitialize = this.apiService.postComponentInitialize(configuration.uid);
            operations.push(postInitialize);
        }
        
        return forkJoin(operations);
    }
}