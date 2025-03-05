import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CityModel } from '../models/cityModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor() { }

  private httpClient = inject(HttpClient);

  getCities(): Observable<CityModel[]> {


    return this.httpClient.get('https://679b8dc433d31684632448c9.mockapi.io/cities').pipe(map(x => x as CityModel[]))

  }

}
