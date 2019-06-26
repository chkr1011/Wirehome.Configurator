import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { SystemStatusItemModel } from './shared/system-status-item.model';
import { SystemSetupModel } from './shared/system-setup.model';
import { SystemSettingsModel } from './shared/system-settings.model';

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.css']
})

export class SystemComponent implements OnInit {

    constructor(private apiService: ApiService) {
    }

    systemStatusItems: SystemStatusItemModel[];

    systemSetupModel: SystemSetupModel = new SystemSetupModel();

    systemSettingsModel: SystemSettingsModel = new SystemSettingsModel();

    isPerformingSystemSetup: boolean;

    isPerformingPing: boolean;

    ngOnInit() {
        this.updateSystemStatus();
    }

    performPing() {
        this.isPerformingPing = true;
        this.apiService.getPing().subscribe(r => this.isPerformingPing = false);
    }

    performSystemSetup() {
        this.isPerformingSystemSetup = true;
        this.apiService.postSystemSetup(
            this.systemSetupModel.fixStartupScripts,
            this.systemSetupModel.appPackageUid,
            this.systemSetupModel.configuratorPackageUid)
            .subscribe(r => this.isPerformingSystemSetup = false);
    }

    updateSystemStatus() {
        this.apiService.getSystemStatus().subscribe(items => {
            var itemsModel = new Array<SystemStatusItemModel>();

            for (let property in items) {

                let value = items[property];

                let item = new SystemStatusItemModel();
                item.uid = property;
                item.value = value;
                item.type = typeof (value)

                if (value == null) {
                    item.type = "null";
                }

                itemsModel.push(item);
            }

            itemsModel.sort((x, y) => x.uid < y.uid ? - 1 : 1);

            this.systemStatusItems = itemsModel
        });
    }
}
