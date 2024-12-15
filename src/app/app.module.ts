import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';  // Asegúrate de que IonicModule esté importado
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePage } from './home/home.page';
import { CreatePage } from './create/create.page';
import { PendientesPage } from './pendientes/pendientes.page';
import { TareaPage } from './tarea/tarea.page';

@NgModule({
  declarations: [
    AppComponent,  // Solo declaramos AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Asegúrate de que IonicModule esté en imports
    RouterModule.forRoot([
      { path: '', component: HomePage },
      { path: 'crear-tarea', component: CreatePage },
      { path: 'pendientes', component: PendientesPage },
      { path: 'tarea', component: TareaPage },
    ])
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
