import { Component, computed, inject, model, OnInit, SimpleChanges } from "@angular/core";
import { TimerService } from "../../services/timer.service";
import { CoreService } from "../../services/core.service";

@Component({
    selector: "app-menubar",
    templateUrl: "./menubar.component.html",
    styleUrl: "./menubar.component.css"
})
export class MenubarComponent implements OnInit {

    selectedModeIndex = model<number>(0);
    private timer = inject(TimerService);
    private coreService = inject(CoreService);
    private minute = computed(() => this.timer.minute() < 10 ? '0' + this.timer.minute() : this.timer.minute());
    private second = computed(() => this.timer.second() < 10 ? '0' + this.timer.second() : this.timer.second());
    ngOnInit(): void {
        this.timer.initiateTimer(this.selectedModeIndex() === 0);
    }
    ngOnChanges(changes: SimpleChanges<MenubarComponent>): void {
        if (changes.selectedModeIndex) {
            this.timer.initiateTimer(this.selectedModeIndex() === 0);
        }
    }

    stats = computed(() => [
        { label: 'WPM', value: this.coreService.wpm() },
        { label: 'Accuracy', value: this.coreService.accuracy() + '%' },
        { label: 'Time', value: this.minute() + ':' + this.second() }
    ]);

    difficulties = ['Easy', 'Medium', 'Hard'];
    modes = ['Time', 'Passage'];
    selectedDifficultyIndex = model<number>(0);
    selectedDifficulty: string = 'Easy';
    selectedMode = 'Time';
    selectedPassage = model(this.selectedDifficulty.toLowerCase());
    selectDifficulty(index: number): void {
        if (this.timer.hasStarted()) {
            return;
        }
        this.selectedDifficulty = this.difficulties[index];
        this.selectedDifficultyIndex.set(index);
    }

    selectMode(index: number): void {
        if (this.timer.hasStarted()) {
            return;
        }
        this.selectedMode = this.modes[index];
        this.selectedModeIndex.set(index);
    }
    leftMenuClass(index: number): string {
        if (index === 1) {
            if (this.coreService.isAccurate()) {
                return 'text-green-500';
            }
            return 'text-red-500';
        }
        else if (index === 2) {
            return 'text-yellow-400';
        }
        return 'text-white';
    }
}