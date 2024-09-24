import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerControlBarComponent } from './player-control-bar.component';

describe('PlayerControlBarComponent', () => {
  let component: PlayerControlBarComponent;
  let fixture: ComponentFixture<PlayerControlBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerControlBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerControlBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
