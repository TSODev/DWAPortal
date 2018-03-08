import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../shared/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryComponent implements OnInit {
	
	@Input() category: Category;
	@Output() categorySelected = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onSelected(){
  	this.categorySelected.emit();
  }
}
