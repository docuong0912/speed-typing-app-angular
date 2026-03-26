import { AfterViewInit, Component, ElementRef, Host, HostListener, inject, Input, input, signal, ViewChild } from "@angular/core";
import { CoreService } from "../../services/core.service";
import { TimerService } from "../../services/timer.service";
import { core } from "@angular/compiler";
import { timer } from "rxjs";

@Component({
    selector: "app-textfield",
    templateUrl: "./textfield.component.html",
    styleUrl: "./textfield.component.css"
})
export class TextfieldComponent {
    step = 0;
    wordCount = 0;
    startIndex = 0;
    errorCount = 0;
    selectedPassage = input<string>('');
    checked: boolean[] = [];
    private coreService = inject(CoreService);
    private timerService = inject(TimerService);
    isActive(index: number): boolean {
        return this.currentIndex() === index;
    }
    currentIndex(): number {
        // Ensure the index is within bounds of the text length
        return Math.min(this.step, Math.max(this.selectedPassage().length, 0));
    }
    validateCharacter(value: string): void {
        if (this.selectedPassage()[this.currentIndex()] === value) {
            this.checked[this.currentIndex()] = true;
        }
        else {
            this.checked[this.currentIndex()] = false;
            this.errorCount++;
        }

    }
    @HostListener("window:keydown", ["$event"])
    setCursor(event: KeyboardEvent): void {
        if (this.step === 0) {
            this.timerService.startTimer();
        }
        if (this.step >= this.selectedPassage().length - 1) {
            this.timerService.stopTimer();
            return;
        }
        if (event.shiftKey) {
            if (event.key === "Shift") {
                return;
            }
        }
        if (event.key === "Backspace") {
            if (this.step > 0) {
                this.step--;
            }
            return;
        }
        if (event.key === "Spacebar" || event.key === " " && this.selectedPassage()[this.currentIndex()] === " ") {
            let wordCheck = this.checked.slice(this.startIndex, this.currentIndex());
            if (wordCheck.every((v) => v === true)) {
                this.wordCount++;
            }
            this.startIndex = this.currentIndex() + 1;
            this.coreService.caculateWPM(this.wordCount, this.timerService.minute() * 60 + this.timerService.second());
        }
        this.validateCharacter(event.key);
        this.step++;
        this.coreService.caculateAccuracy(this.step - this.errorCount, this.step);

    }
}