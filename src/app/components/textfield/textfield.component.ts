import { AfterViewInit, Component, ElementRef, Host, HostListener, input, signal, ViewChild } from "@angular/core";

@Component({
    selector: "app-textfield",
    templateUrl: "./textfield.component.html"
})
export class TextfieldComponent {
    @ViewChild("textElement") textElement!: ElementRef<SVGTextElement>;

    step = 0;
    text = "The quick brown fox jumps over the lazy dog.";
    checked: boolean[] = [];

    isActive(index: number): boolean {
        return this.currentIndex() === index;
    }
    currentIndex(): number {
        // Ensure the index is within bounds of the text length
        return Math.min(this.step, Math.max(this.text.length - 1, 0));
    }
    validateCharacter(value: string): void {
        if (this.text[this.currentIndex()] === value) {
            this.checked[this.currentIndex()] = true;
        }
        else {
            this.checked[this.currentIndex()] = false;
        }

    }
    @HostListener("window:keydown", ["$event"])
    setCursor(event: KeyboardEvent): void {
        this.validateCharacter(event.key);
        this.step++;
        console.log(event.key);
    }
}