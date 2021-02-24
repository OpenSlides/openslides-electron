import { Injectable } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BehaviorSubject } from 'rxjs';

const LAST_SERVER_URL_STORE_KEY = 'lastUsedServer';
/**
 * We only allow connection to https
 */
export const protocols = {
    http: 'http://',
    https: 'https://'
};

@Injectable({
    providedIn: 'root'
})
export class AttachServerService {
    private serverUrlSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
    public serverUrlObservable = this.serverUrlSubject.asObservable();

    public constructor(private storage: StorageMap) {
        storage.get(LAST_SERVER_URL_STORE_KEY, { type: 'string' }).subscribe(lastUrl => {
            if (lastUrl) {
                console.log('last url', lastUrl);
                this.serverUrlSubject.next(lastUrl);
            }
        });
    }

    public async setExtUrl(url: string): Promise<void> {
        const prettyUrl = this.prettifyUrl(url);
        this.serverUrlSubject.next(prettyUrl);

        if (prettyUrl.trim()) {
            await this.storage.set(LAST_SERVER_URL_STORE_KEY, prettyUrl).subscribe();
        }
    }

    /**
     * Cut everything from an OpenSlides URL thats not useful or would harm the other services
     */
    private prettifyUrl(url: string): string {
        try {
            if (url.startsWith(protocols.http)) {
                throw new Error('No allowed');
            } else if (!url.startsWith(protocols.https)) {
                url = protocols.https + url;
            }
            return new URL(url).host;
        } catch (e) {
            return url;
        }
    }
}
