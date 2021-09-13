import { Directive, Input, HostBinding } from '@angular/core';

/**
 * Dummy directive to allow html-tag 'webview'
 * The name of this directive has to be "webview"
 * not app-webview and not [webview].
 * This hooks to electrons webview selector
 */
/* eslint-disable */
@Directive({
    selector: 'webview'
})
/* eslint-enable */
export class WebviewDirective {
    @HostBinding('attr.src')
    serverUrl = '';

    @Input()
    set src(value: string | null) {
        if (value?.trim()) {
            this.serverUrl = value;
        }
    }
}
