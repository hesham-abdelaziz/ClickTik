import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PaginationComponent } from "./pagination.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations : [PaginationComponent],
    imports : [CommonModule , FontAwesomeModule],
    exports : [PaginationComponent]
})

export class PaginationModule {}