import { Component } from "@angular/core";

@Component({
    selector: "app-menubar",
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css"
})
export class MenubarComponent {
    stats = [
        { label: 'WPM', value: 40 },
        { label: 'Accuracy', value: '90%' },
        { label: 'Time', value: '00:30' }
    ];

    difficulties = ['Easy', 'Medium', 'Hard'];
    modes = ['Time', 'Passage'];

    selectedDifficulty = 'Easy';
    selectedMode = 'Time';

    selectDifficulty(difficulty: string): void {
        this.selectedDifficulty = difficulty;
    }

    selectMode(mode: string): void {
        this.selectedMode = mode;
    }
}