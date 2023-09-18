import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html'
})

export class PaginationComponent {
    @Input() meta = null;
    constructor() { }


}