import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';

import * as ace from 'ace-builds';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-crimson_editor';

@Component({
    selector: 'app-json-editor',
    templateUrl: './json-editor.component.html',
    styleUrls: ['./json-editor.component.css']
})

export class JsonEditorComponent implements OnInit {

    constructor() { }

    //@Output() codeChange = new EventEmitter();

    private codeValue: string;

    @Input()
    set code(value: string) {
        this.codeValue = value;
        this.updateEditorCode();

        //this.codeChange.emit(value);
    }

    get code(): string {
        return this.codeValue;
    }

    @ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    private codeEditor: ace.Ace.Editor;

    ngOnInit() {
        const element = this.codeEditorElmRef.nativeElement;
        const editorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 10,
            maxLines: Infinity,
        };

        this.codeEditor = ace.edit(element, editorOptions);
        this.codeEditor.setTheme('ace/theme/crimson_editor');
        this.codeEditor.getSession().setTabSize(4);
        this.codeEditor.getSession().setMode('ace/mode/json');
        this.codeEditor.setPrintMarginColumn(-1);
        this.codeEditor.setShowFoldWidgets(true);
        this.updateEditorCode();
    }

    private updateEditorCode() {
        if (this.codeEditor == null) {
            return;
        }

        if (this.codeValue) {
            try {
                this.codeEditor.setValue(JSON.stringify(JSON.parse(this.codeValue), null, '    '));
            }
            catch
            {
                // Set the code without formatting.
                this.codeEditor.setValue(this.codeValue);
            }
        }

        this.codeEditor.selection.clearSelection();
    }
}
