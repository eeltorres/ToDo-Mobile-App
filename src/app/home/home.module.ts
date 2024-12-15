import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './home.page';

@NgModule({
  declarations: [HomePage],
  imports: [
    CommonModule
    // Otros módulos
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agregar esto
})
export class HomePageModule {}
