import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyAuthComponent } from './spotify-auth.component';

describe('SpotifyAuthComponent', () => {
  let component: SpotifyAuthComponent;
  let fixture: ComponentFixture<SpotifyAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpotifyAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpotifyAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
