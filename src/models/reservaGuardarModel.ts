import { PasajeroModel } from "./pasajerosModel";


export interface ReservaGuardarModel {

  id: string;
  document: string;
  firstName: string;
  lastName: string;
  service: string;
  passengers: PasajeroModel[]


}
