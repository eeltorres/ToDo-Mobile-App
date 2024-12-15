import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular'; // Importar AlertController
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Tarea {
  titulo: string;
  descripcion: string;
  tipo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true, // Asegúrate de que sea Standalone
  imports: [IonicModule, CommonModule], // Importa IonicModule aquí
})
export class HomePage {
  tareasPendientes: any[] = [];
  tareasCompletadas: any[] = [];

  constructor(private router: Router, private alertController: AlertController) {}

  ionViewWillEnter() {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    this.tareasPendientes = tareas.filter((tarea: any) => tarea.tipo !== 'completada');
    this.tareasCompletadas = tareas.filter((tarea: any) => tarea.tipo === 'completada');
  }

  // Navegar a la pantalla de creación de tarea
  navegarCrearTarea() {
    console.log("Botón '+' fue clickeado"); // Log para verificar el clic
    this.router.navigate(['/crear-tarea']); // Navegar programáticamente
  }

  // Navegar a la pantalla de tareas pendientes
  navegarPendientes() {
    console.log('Tareas Pendientes clickeadas');
    this.router.navigate(['/pendientes']);
  }

  // Navegar a la pantalla de detalles de tarea
  verTarea(tarea: any) {
    this.router.navigateByUrl('/tarea', { state: { tarea } });
  }

  // Mostrar alerta para confirmar la eliminación de tareas completadas
  async mostrarAlertaEliminar() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que deseas eliminar todas las tareas completadas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Sí, eliminar',
          handler: () => {
            this.eliminarTareasCompletadas();
          },
        },
      ],
    });

    await alert.present();
  }

  // Eliminar todas las tareas completadas
  eliminarTareasCompletadas() {
    const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
    const tareasActualizadas = tareas.filter((tarea: Tarea) => tarea.tipo !== 'completada');
    localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));

    // Actualizar listas locales y refrescar la vista
    this.tareasPendientes = tareasActualizadas;
    this.tareasCompletadas = []; // Vaciar la lista de tareas completadas
    console.log('Tareas completadas eliminadas');
  }
}
