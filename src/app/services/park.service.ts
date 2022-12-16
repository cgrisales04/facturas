import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { Facturas, ResponseGetHttp } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ParkService {
  private baseUrl: string = environment.baseUrl;
  private _facturas!: Facturas;
  private _gastos!: any;
  private _etapas!: any;
  private _proveedores!: any;
  private _activos!: any;


  get facturas() {
    return [...this._facturas];
  }

  get gastos() {
    return [...this._gastos];
  }

  get etapas() {
    return [...this._etapas];
  }

  get proveedores() {
    return [...this._proveedores];
  }

  get activos() {
    return [...this._activos];
  }


  constructor(private http: HttpClient) { }

  getFacturas(): Observable<any> {
    return this.http.get(`${this.baseUrl}/factura`)
      .pipe(
        map((resp: any) => {
          this._facturas = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  getGasto(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gasto`)
      .pipe(
        map((resp: any) => {
          this._gastos = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  getEtapa(): Observable<any> {
    return this.http.get(`${this.baseUrl}/etapa`)
      .pipe(
        map((resp: any) => {
          this._etapas = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  getProveedor(): Observable<any> {
    return this.http.get(`${this.baseUrl}/proveedor`)
      .pipe(
        map((resp: any) => {
          this._proveedores = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  getActivo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/activo`)
      .pipe(
        map((resp: any) => {
          this._activos = resp.data;
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  deleteFactura(factura_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/factura/${factura_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  selectFactura(factura_id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/factura/${factura_id}`)
      .pipe(
        map((resp: any) => {
          return resp;
        }),
        catchError(err => of({}))
      )
  }

  insertFactura(numero: string,
    fecha: string,
    valor_neto: number,
    valor_iva: number,
    valor_total: number,
    id_activo: number,
    id_proveedor: number,
    id_etapa: number,
    id_gasto: number) {

    return this.http.post<any>(`${this.baseUrl}/factura`, {
      numero,
      fecha,
      valor_neto,
      valor_iva,
      valor_total,
      id_activo,
      id_proveedor,
      id_etapa,
      id_gasto,
    })
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }

  updatePark(id_factura: string, numero: string,
    fecha: string,
    valor_neto: number,
    valor_iva: number,
    valor_total: number,
    id_activo: number,
    id_proveedor: number,
    id_etapa: number,
    id_gasto: number) {

    return this.http.put<any>(`${this.baseUrl}/factura/${id_factura}?numero=${numero}&fecha=${fecha}&valor_neto=${valor_neto}&valor_iva=${valor_iva}&valor_total=${valor_total}&id_activo=${id_activo}&id_proveedor=${id_proveedor}&id_etapa=${id_etapa}&id_gasto=${id_gasto}`, {})
      .pipe(
        tap(resp => {
          if (resp.status) {
            return resp;
          }
        }),
        map(resp => resp),
        catchError(err => of(err.error))
      )
  }

}
