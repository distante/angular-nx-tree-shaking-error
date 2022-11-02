import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyComponentComponent } from './components/my-component/my-component.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MyComponentComponent],
  exports: [MyComponentComponent],
})
export class MyLibraryModule {}
