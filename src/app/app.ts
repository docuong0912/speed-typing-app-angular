import { Component, computed, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';
import { TextfieldComponent } from './components/textfield/textfield.component';
import data from './data/data.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarComponent, TextfieldComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

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
