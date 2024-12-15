import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

interface Tarea {
  titulo: string;
  descripcion: string;
  tipo: string; // "pendiente" o "completada"
}

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
  standalone: true,  // Definir el componente como Standalone
  imports: [IonicModule, CommonModule],  // Importar IonicModule y CommonModule
})
export class PendientesPage {
  tareasPendientes: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];

  constructor() {}

  ionViewWillEnter() {
    // Leer las tareas desde LocalStorage
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.tareasPendientes = tareas.filter((tarea: Tarea) => tarea.tipo !== 'completada');
    this.tareasCompletadas = tareas.filter((tarea: Tarea) => tarea.tipo === 'completada');
  }

  // Función para marcar una tarea como completada  
  marcarCompletada(tarea: Tarea) {
    // Cambiar el tipo a 'completada'
    tarea.tipo = 'completada';
  
    // Actualizar el LocalStorage
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const tareasActualizadas = tareasGuardadas.map((t: Tarea) =>
      t.titulo === tarea.titulo ? { ...t, tipo: 'completada' } : t
    );
    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
  
    // Remover la tarea de la lista local de pendientes
    this.tareasPendientes = this.tareasPendientes.filter(t => t !== tarea);
  }

  // Función para eliminar una tarea
  eliminarTarea(tarea: Tarea) {
    // Filtramos la tarea eliminada de las listas pendientes y completadas
    this.tareasPendientes = this.tareasPendientes.filter(t => t !== tarea);
    this.tareasCompletadas = this.tareasCompletadas.filter(t => t !== tarea);
    this.actualizarTareas();  // Actualizamos el almacenamiento
  }

  // Función para actualizar las tareas en LocalStorage
  actualizarTareas() {
    const todasLasTareas = [...this.tareasPendientes, ...this.tareasCompletadas];
    localStorage.setItem('tareas', JSON.stringify(todasLasTareas));  // Guardar tareas actualizadas
  }
}
