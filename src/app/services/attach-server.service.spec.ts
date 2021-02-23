import { TestBed } from '@angular/core/testing';

import { AttachServerService } from './attach-server.service';

describe('AttachServerService', () => {
    let service: AttachServerService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AttachServerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
