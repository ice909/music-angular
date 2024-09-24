import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedPlaylistComponent } from './personalized-playlist.component';

describe('PersonalizedPlaylistComponent', () => {
  let component: PersonalizedPlaylistComponent;
  let fixture: ComponentFixture<PersonalizedPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizedPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizedPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
