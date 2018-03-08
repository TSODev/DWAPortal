import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective {

	@HostBinding('class.collapse') isCollapsed: string = 'collapse.show';

	@HostListener('click') toggleCollapse() {
		console.log('HostListener Collapse directive - ' + this.isCollapsed);
		this.isCollapsed = this.isCollapsed == 'collapse.show' ? 'collapse' : 'collapse.show'; 
	}
  constructor() { }

}
