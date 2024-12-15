import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CreatePage {
  titulo = '';
  descripcion = '';
  tipo = 'trabajo';

  constructor(private router: Router) {}

  agregarTarea() {
    if (this.titulo && this.descripcion) {
      const nuevaTarea = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        tipo: this.tipo,
      };

      const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
      tareas.push(nuevaTarea);
      localStorage.setItem('tareas', JSON.stringify(tareas));
      this.router.navigate(['/']);
    }
  }

  cancelar() {
    this.router.navigate(['/']); // Redirige a la pantalla Home
  }
}
