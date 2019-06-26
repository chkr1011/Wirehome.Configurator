import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    baseUrl: string = "/api/";

    constructor(private http: HttpClient) {
        // For local testing Wirehome.Core is running on port 80 and VSCode is 
        // hosting the app at port 4200. In production both the app and API are
        // hosted in the same server. So we must redirect the API calls here.
        let regexp = new RegExp('(.+://.+):+([0-9]*)$');

        let values = regexp.exec(window.location.origin);
        if (values != null) {
            let host = values[1];
            let port = values[2];

            if (port == "" || port == "80") {
                this.baseUrl = `/api/`;
            }
            else {
                this.baseUrl = `${host}:80/api/`;
            }
        }
    }

    getSystemStatus(): Observable<object> {
        return this.http.get(`${this.baseUrl}v1/system/status`).pipe(tap(r => this.logResponse(r)));
    }

    getGlobalVariables(): Observable<object> {
        return this.http.get(`${this.baseUrl}v1/global_variables`).pipe(tap(r => this.logResponse(r)));
    }

    deleteGlobalVariable(uid: string) {
        return this.http.delete(`${this.baseUrl}v1/global_variables/${uid}`).pipe(tap(r => this.logResponse(r)));
    }

    postGlobalVariable(uid: string, value: any) {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        })

        return this.http.post(`${this.baseUrl}v1/global_variables/${uid}`, value, { headers: headers }).pipe(tap(r => this.logResponse(r)));
    }

    getLog(includeInformations: boolean, includeWarnings: boolean, includeErrors: boolean, takeCount: number): Observable<object> {
        let parameters = new HttpParams()
            .set('includeInformations', includeInformations ? 'true' : 'false')
            .set('includeWarnings', includeWarnings ? 'true' : 'false')
            .set('includeErrors', includeErrors ? 'true' : 'false')
            .set('takeCount', takeCount.toString());

        return this.http.get(`${this.baseUrl}v1/log`, { params: parameters }).pipe(tap(r => this.logResponse(r)));
    }

    deleteLog() {
        return this.http.delete(`${this.baseUrl}v1/log`).pipe(tap(r => this.logResponse(r)));
    }

    getComponents(): Observable<object> {
        return this.http.get(`${this.baseUrl}v1/components`).pipe(tap(r => this.logResponse(r)));
    }

    getComponentConfiguration(uid: string): Observable<object> {
        return this.http.get(`${this.baseUrl}v1/components/${uid}/configuration`).pipe(tap(r => this.logResponse(r)));
    }

    postComponentConfiguration(uid: string, configuration: object): Observable<object> {
        return this.http.post(`${this.baseUrl}v1/components/${uid}/configuration`, configuration).pipe(tap(r => this.logResponse(r)));
    }

    postComponentSettings(uid: string, settings: object): Observable<object> {
        return this.http.post(`${this.baseUrl}v1/components/${uid}/settings`, settings).pipe(tap(r => this.logResponse(r)));
    }

    postSystemSetup(fixStartupScripts: boolean, appPackageUid: string, configuratorPackageUid: string): Observable<object> {
        let parameters = new HttpParams()
            .set('fixStartupScripts', fixStartupScripts ? 'true' : 'false')
            .set('appPackageUid', appPackageUid)
            .set('configuratorPackageUid', configuratorPackageUid);

        return this.http.post(`${this.baseUrl}v1/system/setup`, {}).pipe(tap(r => this.logResponse(r)));
    }

    getPing(): Observable<object> {
        return this.http.get(`${this.baseUrl}v1/system/ping`).pipe(tap(r => this.logResponse(r)));
    }

    postComponentMessage(uid: string, message: object, returnUpdatedComponent: boolean): Observable<object> {
        let parameters = new HttpParams()
            .set('returnUpdatedComponent', returnUpdatedComponent ? 'true' : 'false');

        return this.http.post(`${this.baseUrl}v1/components/${uid}/process_message`, message, { params: parameters }).pipe(tap(r => this.logResponse(r)));
    }

    postComponentInitialize(uid: string) {
        return this.http.post(`${this.baseUrl}v1/components/${uid}/initialize`, {}).pipe(tap(r => this.logResponse(r)));
    }

    private logResponse(response: any): any {
        //console.log(response);
        return response;
    }
}
