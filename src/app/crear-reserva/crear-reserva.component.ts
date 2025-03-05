import { Component, inject } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CityModel } from '../../models/cityModel';
import { CityService } from '../../services/city.service';
import { ServiceModel } from '../../models/serviceModel';
import { ServiceService } from '../../services/service.service';
import { CommonModule } from '@angular/common';
import { ReservaGuardarModel } from '../../models/reservaGuardarModel';
import { PasajeroModel } from '../../models/pasajerosModel';
import { ReservaService } from '../../services/reserva.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})




export class CrearReservaComponent {


  cities: CityModel[] = [];
  services: ServiceModel[] = [];
  cityService = inject(CityService);
  serviceService = inject(ServiceService);
  reservaService = inject(ReservaService);


  ngOnInit() {

    this.getCities();

  }

  formularioReserva: FormGroup = new FormGroup({

    origen: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaIda: new FormControl('', Validators.required),
    serviciosDisponible: new FormControl(''),
    documento: new FormControl('', {

      validators: [Validators.required, Validators.minLength(6), Validators.pattern('^[1-9][0-9]*$')],
      asyncValidators: this.validarDNI.bind(this)


    }),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    apellido: new FormControl('', [Validators.required, Validators.minLength(2)]),
    pasajeros: new FormArray([])

  });


  addPasajeros() {

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

  getCities() {

    this.cityService.getCities().subscribe(x => this.cities = x);

  }

  getServices() {

    this.serviceService.getAllService().subscribe(x => this.services = x);
  }


  confirmarReserva() {



    if (this.formularioReserva.valid) {


      const reservaGuardar: ReservaGuardarModel = {

        id: '1',
        documento: this.formularioReserva.get('documento')?.value,
        firstName: this.formularioReserva.get('nombre')?.value,
        lastName: this.formularioReserva.get('apellido')?.value,
        service: this.formularioReserva.get('serviciosDisponible')?.value,
        passengers: this.transformarPasajeros()



      }

      this.reservaService.guardarReserva(reservaGuardar).subscribe(x => {

        if (x.id != '') {

          alert("SE HA GUARDADADO CORRECTAMENTE LA RESERVA");

        } else {

          alert("SE HA PRODUCIDO UN ERROR VERIFICAR");

        }

      });


    }

  }

  buscar() {

  }

  obtenerPasajeros() {
    return (this.formularioReserva.get('pasajeros') as FormArray).controls;
  }


  transformarPasajeros(): PasajeroModel[] {

    const pasajerosFinales: PasajeroModel[] = [];

    const pasajeros = this.formularioReserva.get('pasajeros') as FormArray;

    for (let index = 0; index < pasajeros.controls.length; index++) {


      const formularioPasajeros: FormGroup = pasajeros.controls[index] as FormGroup;

      const pasajeroFinal: PasajeroModel = {

        document: formularioPasajeros.get('documento')?.value,
        firstName: formularioPasajeros.get('nombre')?.value,
        lastName: formularioPasajeros.get('apellido')?.value

      }

      pasajerosFinales.push(pasajeroFinal);


    }

    return pasajerosFinales;

  }

  validarDNI(control: AbstractControl): Observable<ValidationErrors | null> {

    return this.reservaService.getReservas().pipe(map(x => {

      for (let index = 0; index < x.length; index++) {

        if (control.value == x[index].document) {

          return { documentoInvalido: 'documentoInvalido' }

        }
      }
      return null;

    })
    );

  }

}
