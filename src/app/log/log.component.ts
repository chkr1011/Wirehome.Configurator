import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { LogEntryModel } from './shared/log-entry.model';
import { LogLevel } from "./shared/log-level.model";

@Component({
    selector: 'app-log',
    templateUrl: './log.component.html',
    styleUrls: ['./log.component.css']
})

export class LogComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    public logLevels = LogLevel;

    logEntries: Array<LogEntryModel>;
    selectedLogEntry: LogEntryModel;

    includeErrors: boolean = true;

    includeWarnings: boolean = true;

    includeInformations: boolean = false;

    takeCount: number = 100;

    ngOnInit() {
        this.loadLogItems();
    }

    loadLogItems() {
        this.apiService.getLog(this.includeInformations, this.includeWarnings, this.includeErrors, this.takeCount).subscribe(items => {
            var entriesModel = new Array<LogEntryModel>();

            for (let item of items) {
                let entryModel = new LogEntryModel();

                switch (item["level"]) {
                    case "Error":
                        {
                            entryModel.level = LogLevel.Error;
                            break;
                        }

                    case "Warning":
                        {
                            entryModel.level = LogLevel.Warning;
                            break;
                        }

                    default:
                        {
                            entryModel.level = LogLevel.Information;
                            break;
                        }
                }

                entryModel.timestamp = item["timestamp"];
                entryModel.source = item["source"];
                entryModel.message = item["message"];
                entryModel.exception = item["exception"];

                entriesModel.push(entryModel);
            }

            this.logEntries = entriesModel;
        });
    }

    clearLogItems() {
        this.apiService.deleteLog().subscribe(_ => this.loadLogItems());
    }

    showException(logEntry: LogEntryModel) {
        this.selectedLogEntry = logEntry;

        //@ts-ignore
        $('.logEntryExceptionModal').modal('show');
    }

    copyExceptionToClipboard() {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', (this.selectedLogEntry.exception));
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
    }
}
