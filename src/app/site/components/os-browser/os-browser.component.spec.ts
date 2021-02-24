import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsBrowserComponent } from './os-browser.component';

describe('OsBrowserComponent', () => {
    let component: OsBrowserComponent;
    let fixture: ComponentFixture<OsBrowserComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OsBrowserComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OsBrowserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
