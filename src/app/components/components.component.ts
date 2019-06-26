import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ComponentModel } from './model/component.model';
import { SETTING_UID_APP_CAPTION, SETTING_UID_APP_IMAGE_ID } from '../api/shared/setting-uids.model';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    components: Array<ComponentModel>;

    selectedComponent: ComponentModel;

    isLoading: boolean = true;

    ngOnInit() {
        this.updateComponents();
    }


    createNewComponent() {
        this.selectedComponent = new ComponentModel();
        this.showComponentDetails();
    }

    showComponentEditor(component: ComponentModel) {
        this.selectedComponent = component;
        this.showComponentDetails();
    }

    onComponentEditorClosed(parameter: boolean) {
        //@ts-ignore
        //$('.xzt').transition('fly right');
        $('.components-list').transition('fly right');
        this.selectedComponent = null;
    }

    updateComponents() {
        this.isLoading = true;

        this.apiService.getComponents().subscribe(items => {
            var itemsModel = new Array<ComponentModel>();

            for (let item of items as Array<object>) {
                let itemModel = new ComponentModel();
                itemModel.uid = item["uid"];
                itemModel.caption = item["settings"][SETTING_UID_APP_CAPTION];
                itemModel.imageId = item["settings"][SETTING_UID_APP_IMAGE_ID];
                itemsModel.push(itemModel);
            }

            itemsModel.sort((x, y) => x.uid < y.uid ? - 1 : 1);

            this.components = itemsModel;

            this.isLoading = false;
        });
    }

    private showComponentDetails() {
        //@ts-ignore
        //$('.abc').modal({ centered: false }).modal('show');

        //@ts-ignore
        $('.components-list').transition('fly right');

        //@ts-ignore
        $('.component-editor').transition('fly right');
    }
}
