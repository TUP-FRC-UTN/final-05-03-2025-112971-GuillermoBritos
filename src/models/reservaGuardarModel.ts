import { PasajeroModel } from "./pasajerosModel";


export interface ReservaGuardarModel {

  id: string;
  documento: string;
  firstName: string;
  lastName: string;
  service: string;
  passengers: PasajeroModel[]


}
