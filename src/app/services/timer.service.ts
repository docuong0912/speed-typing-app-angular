import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TimerService {
    private timerId: number | null = null;
    private _second = signal(0);
    private _minute = signal(0);
    readonly second = this._second.asReadonly();
    readonly minute = this._minute.asReadonly();
    startTimer(): void {
        this.stopTimer();
        this._second.update(v => v + 1);
        this.timerId = setInterval(() => {
            this._second.update((v) => v + 1);
            if (this._second() === 60) {
                this._second.set(0);
                this._minute.update((v) => v + 1);
            }
        }, 1000);
    }

    stopTimer(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    hasStarted(): boolean {
        return this.timerId !== null;
    }
    resetTimer(): void {
        this.stopTimer();
        this._second.set(0);
        this._minute.set(0);
    }
}