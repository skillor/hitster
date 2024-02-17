import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingModalComponent } from './starting-modal.component';

describe('StartingModalComponent', () => {
  let component: StartingModalComponent;
  let fixture: ComponentFixture<StartingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartingModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
