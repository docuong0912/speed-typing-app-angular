import { Component, inject, Input } from "@angular/core";
import { CoreService } from "../../../services/core.service";

@Component({
    selector: "app-results-common",
    templateUrl: "./results.component.html"
})
export class ResultsComponent {
    coreService = inject(CoreService);
}