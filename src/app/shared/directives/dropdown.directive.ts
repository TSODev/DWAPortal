import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

	// @HostBinding('class.show') isOpen = false;

	// @HostListener('click') toggleOpen() {
	// 	console.log('HostListener Dropdown directive '+ this.isOpen);
	// 	this.isOpen = !this.isOpen; 
	// }
 //  constructor() { }


	constructor() { }

	@HostBinding('class.open') get opened()
		{
			return this.isOpen;
		}

	@HostListener('click') open()
		{
			console.log('HostListener Dropdown directiv Open '+ this.isOpen);
			this.isOpen=true;
		}

	@HostListener('mouseleave') close()
		{
			console.log('HostListener Dropdown directive Close '+ this.isOpen);
			this.isOpen=false;
		}

	private isOpen=false;

}
