import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {OrderByPipe} from '../pipes/orderby.pipe';
import {MainCategoryFilterPipe} from '../pipes/maincategories.pipe';

@NgModule({
  imports:      [ CommonModule ],
  declarations: [ OrderByPipe, MainCategoryFilterPipe ],
  exports:      [ OrderByPipe, MainCategoryFilterPipe]
})
export class SharedModule { }
