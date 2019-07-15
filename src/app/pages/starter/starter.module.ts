import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { StarterComponent } from './starter.component';
import { SharedModule } from '../../shared/shared.module.ts';

const routes: Routes = [{
	path: '',
	data: {
        title: 'Starter Page',
        urls: [{title: 'Dashboard', url: '/dashboard'}, {title: 'Starter Page'}]
    },
	component: StarterComponent
}];

@NgModule({
	imports: [
    	FormsModule,
		CommonModule,
		SharedModule,
    	RouterModule.forChild(routes)
    ],
	declarations: [StarterComponent]
})
export class StarterModule { }
