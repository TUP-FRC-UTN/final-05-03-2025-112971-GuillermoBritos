import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ServiceModel } from '../models/serviceModel';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor() { }


  private httpClient = inject(HttpClient);

  getAllService(): Observable<ServiceModel[]> {


    return this.httpClient.get('https://679b8dc433d31684632448c9.mockapi.io/services').pipe(map(x => x as ServiceModel[]))

  }

}
