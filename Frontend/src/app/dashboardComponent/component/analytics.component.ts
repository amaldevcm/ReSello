import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-analytics',
    templateUrl: './analytics.component.html'
})

export class AnalyticsComponent {
    @Input() analytics;
    
    constructor() {}
}