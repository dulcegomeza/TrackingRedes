import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoadingDirective } from "../directivas/loading.directive";
import {NgxMaskModule} from 'ngx-mask'
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';

@NgModule({
    imports: [CommonModule, NgxMaskModule.forRoot(),NgxUpperCaseDirectiveModule],
    declarations: [LoadingDirective],
    exports: [LoadingDirective, NgxMaskModule, NgxUpperCaseDirectiveModule]
})
export class SharedModule { }