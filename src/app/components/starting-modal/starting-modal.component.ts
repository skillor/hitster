import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, EventEmitter, Input, Output } from '@angular/core';
import { hasMobileUserAgent, isMobile } from '../../shared/utils';

@Component({
  selector: 'app-starting-modal',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './starting-modal.component.html',
  styleUrl: './starting-modal.component.css'
})
export class StartingModalComponent implements AfterViewChecked {
  scale = 0;

  ngAfterViewChecked(): void {
    if (!window.visualViewport) return;
    this.scale = window.visualViewport.scale;
  }

  @Input()
  loading = true;

  @Output()
  close : EventEmitter<void> = new EventEmitter();

  isMobile = isMobile();
  hasMobileUserAgent = hasMobileUserAgent();
}
