import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CityModel } from '../../models/cityModel';
import { CityService } from '../../services/city.service';
import { ServiceModel } from '../../models/serviceModel';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-reserva.component.html',
  styleUrl: './crear-reserva.component.css'
})




export class CrearReservaComponent {


  cities: CityModel[] = [];
  services: ServiceModel[] = [];
  cityService = inject(CityService);
  serviceService = inject(ServiceService);


  ngOnInit() {

    this.getCities();

  }

  formularioReserva: FormGroup = new FormGroup({

    origen: new FormControl('', Validators.required),
    destino: new FormControl('', Validators.required),
    fechaIda: new FormControl('', Validators.required),
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

  getCities() {

    this.cityService.getCities().subscribe(x => this.cities = x);

  }

  getServices() {

    this.serviceService.getAllService().subscribe(x => this.services = x);
  }


  confirmarReserva() {



    if (this.formularioReserva.valid) {


    }

  }

  buscar() {

  }


  // validarDNI(control: AbstractControl): Observable<ValidationErrors | null> {

  //   return this.servicio..pipe(map(x => {

  //     for (let index = 0; index < x.length; index++) {

  //       if (control.value == x[index].date && x[index].available == false) {

  //         return { documentoInvalido: 'documentoInvalido' }

  //       }
  //     }
  //     return null;

  //   })
  //   );

  // }

}
