import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComponentModel } from '../components/model/component.model';
import { ApiService } from '../api/api.service';
import { ComponentEditorModel } from './model/component-editor-model';
import { ComponentUpdater } from './services/component-updater';

@Component({
    selector: 'app-component-detail',
    templateUrl: './component-detail.component.html',
    styleUrls: ['./component-detail.component.css']
})

export class ComponentDetailComponent implements OnInit {

    constructor(private apiService: ApiService) {

     }

    @Input()
    set component(value: ComponentModel) {
        this.configuration.uid = value.uid;
    }

    @Output()
    closed: EventEmitter<boolean> = new EventEmitter();

    messageContent: string = "{ \"type\": \"turn_on\" }";

    isProcessingMessage: boolean;

    isSaving: boolean;

    responseContent: string;

    returnUpdatedComponent: boolean = false;

    configuration: ComponentEditorModel = new ComponentEditorModel();

    ngOnInit() {
        //@ts-ignore
        $('.blabla').accordion();
    }

    sendMessage() {
        this.isProcessingMessage = true;
        this.apiService.postComponentMessage(this.configuration.uid, JSON.parse(this.messageContent) as object, this.returnUpdatedComponent)
            .subscribe(r => {
                this.responseContent = JSON.stringify(r);
                this.isProcessingMessage = false;
            });
    }

    close() {
        this.closed.emit(false);
    }

    save(initialize: boolean) {
        this.isSaving = true;

        var componentUpdater = new ComponentUpdater(this.apiService);

        componentUpdater.updateComponent(this.configuration).subscribe(_ => {
            this.closed.emit(true);
            this.isSaving = false;
        });        
    }
}
