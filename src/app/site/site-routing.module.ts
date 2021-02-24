import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectServerComponent } from './components/select-server/select-server.component';
import { OsBrowserComponent } from './components/os-browser/os-browser.component';

const routes: Routes = [
    {
        path: '',
        component: SelectServerComponent
    },
    {
        path: 'browser',
        component: OsBrowserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SiteRoutingModule {}
