import { PasajeroModel } from "./pasajerosModel";

export interface ReservaModel {


  id: string;
  document: string;
  firstName: string;
  lastName: string;
  service: string;
  passengers: PasajeroModel[]


}
