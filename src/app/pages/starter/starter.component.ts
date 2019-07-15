import { Component, AfterViewInit, ElementRef, Directive, OnInit } from '@angular/core';
import { element } from 'protractor';

@Component({
	templateUrl: './starter.component.html'
})
export class StarterComponent implements OnInit {
	subtitle: string;

	constructor(private elementref: ElementRef) {

	}

	ngOnInit() {
		this.getDependencias();
	}

	getDependencias() {

	}

}
