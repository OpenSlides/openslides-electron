import { Component } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { AttachServerService, protocols } from 'src/app/services/attach-server.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-select-server',
    templateUrl: './select-server.component.html',
    styleUrls: ['./select-server.component.scss']
})
export class SelectServerComponent {
    public selectServerForm: FormGroup;

    public get protocolString(): string {
        return protocols.https;
    }

    private get serverUrlCtrl(): AbstractControl | null {
        return this.selectServerForm.get('serverUrl');
    }

    public constructor(formBuilder: FormBuilder, private attachServer: AttachServerService, private router: Router) {
        this.selectServerForm = formBuilder.group({
            serverUrl: ['', { validators: Validators.required, updateOn: 'blur' }]
        });

        attachServer.serverUrlObservable.subscribe(newUrl => this.onExternalUrlChange(newUrl));

        this.serverUrlCtrl?.valueChanges.subscribe(val => {
            attachServer.setExtUrl(val);
        });
    }

    public async selectServer(): Promise<void> {
        const serverUrl: string = this.serverUrlCtrl?.value.trim();
        if (serverUrl) {
            await this.attachServer.setExtUrl(serverUrl);
            this.router.navigate(['browser']);
        }
    }

    private onExternalUrlChange(newUrl: string): void {
        this.serverUrlCtrl?.setValue(newUrl, { emitEvent: false });
    }
}
