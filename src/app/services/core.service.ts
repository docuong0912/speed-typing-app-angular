import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class CoreService {
    private _wpm = signal(0);
    private _accuracy = signal(0);
    private _isAccurate = signal(true);
    readonly wpm = this._wpm.asReadonly();
    readonly accuracy = this._accuracy.asReadonly();
    readonly isAccurate = this._isAccurate.asReadonly();

    caculateWPM(charCount: number, timeInSeconds: number): void {
        const minutes = timeInSeconds / 60;
        this._wpm.set(Math.round(charCount / minutes));
    }

    caculateAccuracy(correctChars: number, totalChars: number): void {
        if (totalChars === 0) return;
        const accuracy = (correctChars / totalChars) * 100;
        if (this._accuracy() <= accuracy) {
            this._isAccurate.set(true);
        } else {
            this._isAccurate.set(false);
        }
        this._accuracy.set(parseFloat(accuracy.toFixed(2)));
    }
}