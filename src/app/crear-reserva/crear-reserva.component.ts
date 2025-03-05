import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})
export class CrearReservaComponent {

  formularioReserva: FormGroup = new FormGroup({


    serviciosDisponible: new FormControl(''),
    documento: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[1-9][0-9]*$')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    pasajeros: new FormArray([])

  });


  añadirPasajeros() {

    const pasajeros = this.formularioReserva.get('pasajeros') as FormArray;

    const pasajero: FormGroup = new FormGroup({

      documentoPasajero: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('^[1-9][0-9]*$')]),
      nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    })

    pasajeros.push(pasajero);

  }



  removerPasajero(index: number) {

    const pasajeros = this.formularioReserva.get('pasajeros') as FormArray;

    pasajeros.removeAt(index);

  }


  confirmarReserva() {


    
    if (this.formularioReserva.valid) {


    }

  }

}
