import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
    selector: 'app-package-selector',
    templateUrl: './package-selector.component.html',
    styleUrls: ['./package-selector.component.css']
})

export class PackageSelectorComponent implements OnInit {

    constructor(private apiService: ApiService) { }

    @Input()
    id: string;

    @Input()
    version: string;
    
    ngOnInit() {

    }

    pickPackage() {
        //@ts-ignore
        $('.packagePickerModal').modal('show');
    }
}
