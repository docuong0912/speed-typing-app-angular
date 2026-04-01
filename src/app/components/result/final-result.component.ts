import { CommonModule } from "@angular/common";
import { Component, signal, AfterViewInit, Input, inject } from "@angular/core";
import { ResultsComponent } from "../common/result/results.component";
import { CoreService } from "../../services/core.service";

@Component({
    selector: "app-baseline-result",
    templateUrl: "./baseline-result.component.html",
    styleUrl: "./baseline-result.component.css",
    imports: [CommonModule, ResultsComponent]
})
export class BaseLineResult {

}

@Component({
    selector: "app-high-score-result",
    imports: [CommonModule, ResultsComponent],
    templateUrl: "./high-score-result.component.html",
    styleUrl: "./high-score-result.component.css"
})
export class HighScoreResult implements AfterViewInit {
    private readonly confettiColors = [
        "#facc15",
        "#fb7185",
        "#60a5fa",
        "#34d399",
        "#f97316",
        "#a78bfa"
    ];

    confettiPieces = Array(64).fill(0).map((_, i) => ({
        id: i,
        delay: Math.random() * 0.45 + "s",
        duration: Math.random() * 1.6 + 3.4 + "s",
        left: 50 + (Math.random() - 0.5) * 24 + "%",
        burstX: (Math.random() - 0.5) * 36 + "vw",
        burstY: -(Math.random() * 18 + 10) + "vh",
        driftX: (Math.random() - 0.5) * 70 + "vw",
        rotateStart: Math.random() * 360 + "deg",
        rotateEnd: Math.random() * 720 + 360 + "deg",
        size: Math.random() * 8 + 8 + "px",
        color: this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)],
        radius: Math.random() > 0.7 ? "999px" : "2px"
    }));

    ngAfterViewInit() {
        // Confetti animation triggers automatically via CSS
    }
}

@Component({
    selector: "app-test-complete-result",
    imports: [CommonModule, ResultsComponent],
    templateUrl: "./test-complete-result.component.html",
    styleUrl: "./baseline-result.component.css"
})
export class TestCompleteResult {
}

@Component({
    selector: "app-result",
    imports: [BaseLineResult, HighScoreResult, CommonModule, TestCompleteResult],
    templateUrl: "./final-result.component.html",
    styles: [`
        .result-container {background-image: url('/assets/images/pattern-star-1.svg'), url('/assets/images/pattern-star-2.svg');
    background-repeat: no-repeat, no-repeat;
    background-position-x: right, left;
    background-position-y: bottom, top;}`]
})
export class FinalResult {
    coreService = inject(CoreService);
    @Input()
    pageSelected = 0;
    handleRetry(): void {
        this.coreService.resetState();
        this.pageSelected = 0;
    }
}
