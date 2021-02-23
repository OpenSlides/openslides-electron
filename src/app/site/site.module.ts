import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SelectServerComponent } from './components/select-server/select-server.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OsBrowserComponent } from './components/os-browser/os-browser.component';
import { WebviewDirective } from './directives/webview/webview';

@NgModule({
    declarations: [SelectServerComponent, OsBrowserComponent, WebviewDirective],
    imports: [CommonModule, ReactiveFormsModule, SiteRoutingModule]
})
export class SiteModule {}
