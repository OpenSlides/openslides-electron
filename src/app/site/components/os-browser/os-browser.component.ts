import { Component } from '@angular/core';
import { AttachServerService, protocols } from 'src/app/services/attach-server.service';

@Component({
    selector: 'app-os-browser',
    templateUrl: './os-browser.component.html',
    styleUrls: ['./os-browser.component.scss']
})
export class OsBrowserComponent {
    public openSlidesUrl = '';

    constructor(attachServer: AttachServerService) {
        attachServer.serverUrlObservable.subscribe(url => {
            if (url) {
                this.openSlidesUrl = protocols.https + url;
            }
        });
    }
}
