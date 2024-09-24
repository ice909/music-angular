import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedNewsongComponent } from './personalized-newsong.component';

describe('PersonalizedNewsongComponent', () => {
  let component: PersonalizedNewsongComponent;
  let fixture: ComponentFixture<PersonalizedNewsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalizedNewsongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalizedNewsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
