import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TextfieldComponent } from './components/textfield/textfield.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TextfieldComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('typing-speed-test-app');
}
