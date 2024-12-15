import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // Importar IonicModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importar RouterModule si usas navegación

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.page.html',
  styleUrls: ['./tarea.page.scss'],
  standalone: true, // Definir como componente Standalone
  imports: [IonicModule, CommonModule, RouterModule], // Importar los módulos necesarios
})
export class TareaPage implements OnInit {
  tarea: any = null;

  constructor() {}

  ngOnInit() {
    const state = history.state;
    this.tarea = state?.tarea || null;
  }
}
