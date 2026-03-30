import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import data from './data/data.json';
import { FinalResult } from './components/result/final-result.component';
import { LocalStorageService } from './services/localStorage.service';
import { TimerService } from './services/timer.service';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarComponent, TextfieldComponent, FinalResult],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  localStorageService = inject(LocalStorageService);
  timerService = inject(TimerService);
  coreService = inject(CoreService);
  resultPage = signal<number>(0);
  testEnded = computed(() => this.coreService.testEnded() || this.timerService.isEnded());

  constructor() {
    effect(() => {
      if (this.testEnded()) {
        let highScore = this.localStorageService.getItem('wpm');
        console.log(highScore);
        if (!highScore) {
          this.resultPage.set(1);
        }
        else if (this.coreService.wpm() > highScore) {
          this.resultPage.set(2);
        }
        else {
          this.resultPage.set(3);
        }
        this.localStorageService.setItem('wpm', this.coreService.wpm());
      }
    })
  }

  protected readonly title = signal('typing-speed-test-app');
  protected readonly passages = signal(data);
  selectedDifficultyIndex = signal(0);
  selectedPassage = computed(() => {
    const index = this.selectedDifficultyIndex();
    const minCeiled = Math.ceil(1);
    const maxFloored = Math.floor(10);
    let passageIndex = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    return data[index === 0 ? 'easy' : index === 1 ? 'medium' : 'hard'][passageIndex].text;
  });
  selectedModeIndex = signal(0);

}

