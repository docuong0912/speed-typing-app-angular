import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TimerService {
    private timerId: number | null = null;
    private _second = signal(0);
    private _minute = signal(0);
    private _isEneded = signal(false);
    readonly second = this._second.asReadonly();
    readonly minute = this._minute.asReadonly();
    readonly isEnded = this._isEneded.asReadonly();


    initiateTimer(countdown: boolean): void {
        this.stopTimer();
        if (countdown) {
            this._second.set(0);
            this._minute.set(1);
        }
        else {
            this._second.set(0);
            this._minute.set(0);
        }
    }

    startTimer(countdown: boolean): void {
        this.stopTimer();
        if (countdown) {
            this.timerId = setInterval(() => this.handleCountdown(), 1000);
        }
        else {
            this._second.update(v => v + 1);
            this.timerId = setInterval(() => this.handleCountUp(), 1000);
        }

    }

    private handleCountUp(): void {
        this._second.update((v) => {
            if (v + 1 === 60) {
                this._minute.update(m => m + 1);
                return 0;
            }
            return v + 1;
        });
    }

    private handleCountdown(): void {
        const m = this._minute();
        const s = this._second();

        if (m === 0 && s === 0) {
            this.stopTimer();
            this._isEneded.set(true);
            return;
        }

        if (s === 0) {
            this._minute.update(v => v - 1);
            this._second.set(59);
        } else {
            this._second.update(v => v - 1);
        }
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

