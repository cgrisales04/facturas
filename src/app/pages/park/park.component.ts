import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Facturas, ResponseGetHttp } from 'src/app/interfaces/interfaces';
import { ParkService } from 'src/app/services/park.service';
import { SweetAlertService } from '../../services/sweet-alert.service';
import { Factura } from '../../interfaces/interfaces';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})
export class ParkComponent implements OnInit {
  public _facturas!: Facturas;
  public _municipios!: any;
  public _activos!: any;
  public _proveedores!: any;
  public _etapas!: any;
  public _gastos!: any;
  public _facturaSelected: any = {};

  private nameInputs = [
    'numero',
    'fecha',
    'valor_neto',
    'valor_iva',
    'valor_total',
    'id_activo',
    'id_proveedor',
    'id_etapa',
    'id_gasto',
  ];
  public accion: string = 'Agregar';

  form_park: FormGroup = this.fb.group({
    numero: ['', [Validators.required]],
    fecha: ['', [Validators.required]],
    valor_neto: ['0', [Validators.required]],
    valor_iva: ['0', [Validators.required]],
    valor_total: ['0', [Validators.required]],
    id_activo: ['0', [Validators.required]],
    id_proveedor: ['0', [Validators.required]],
    id_etapa: ['0', [Validators.required]],
    id_gasto: ['0', [Validators.required]],
  })

  constructor(private fb: FormBuilder,
    private parkService: ParkService,
    private sweetAlert: SweetAlertService) { }

  ngOnInit(): void {
    this.getFacturas();
    this.getActivos();
    this.getProveedores();
    this.getEtapas();
    this.getGastos();

  }

  swhicheAccion() {
    switch (this.accion) {
      case "Modificar":
        this.updatePark();
        break;
      case "Agregar":
        this.insertPark();
        break;

      default:
        break;
    }
  }


  getFacturas() {
    this.parkService.getFacturas()
      .subscribe(response => {
        if (response.status) {
          this._facturas = this.parkService.facturas;
        }
      })
  }

  getActivos() {
    this.parkService.getActivo()
      .subscribe(response => {
        if (response.status) {
          this._activos = this.parkService.activos;
        }
      })
  }

  getProveedores() {
    this.parkService.getProveedor()
      .subscribe(response => {
        if (response.status) {
          this._proveedores = this.parkService.proveedores;
        }
      })
  }

  getEtapas() {
    this.parkService.getEtapa()
      .subscribe(response => {
        if (response.status) {
          this._etapas = this.parkService.etapas;
        }
      })
  }

  getGastos() {
    this.parkService.getGasto()
      .subscribe(response => {
        if (response.status) {
          this._gastos = this.parkService.gastos;
        }
      })
  }

  deletePark(factura_id: string) {
    this.parkService.deleteFactura(factura_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this.getFacturas();
          this.form_park.reset();
          return response.status;
        }
        this.form_park.reset();
        this.sweetAlert.alertModal('error', "No se puede eliminar la factura porque tiene una dependencia y/o no existe")
        return response.status;
      })
  }

  selectPark(factura_id: string) {
    this.accion = "Modificar";
    this.parkService.selectFactura(factura_id)
      .subscribe(response => {
        if (response.status) {
          this.sweetAlert.alertModal('success', response.message)
          this._facturaSelected = response.data;
          this.setValuesInputsUpdate();
          return response.status;
        }
        this.sweetAlert.alertModal('error', "")
        console.log(response);

        return response.status;
      })
  }

  insertPark() {
    const { numero,
      fecha,
      valor_neto,
      valor_iva,
      valor_total,
      id_activo,
      id_proveedor,
      id_etapa,
      id_gasto } = this.form_park.value;

    this.parkService.insertFactura(numero,
      fecha,
      valor_neto,
      valor_iva,
      valor_total,
      id_activo,
      id_proveedor,
      id_etapa,
      id_gasto)
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.getFacturas();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  setValuesInputsUpdate() {
    this.nameInputs.forEach(value => {
      this.form_park.controls[value].setValue(this._facturaSelected[value])
    })
  }

  updatePark() {
    const { numero,
      fecha,
      valor_neto,
      valor_iva,
      valor_total,
      id_activo,
      id_proveedor,
      id_etapa,
      id_gasto } = this.form_park.value;
    const id_Factura = this._facturaSelected.id_factura;

    this.parkService.updatePark(id_Factura, numero,
      fecha,
      valor_neto,
      valor_iva,
      valor_total,
      id_activo,
      id_proveedor,
      id_etapa,
      id_gasto )
      .subscribe((resp: any) => {
        if (resp.status == true) {
          this.sweetAlert.alertModal('success', resp.message)
          this.getFacturas();
          this.cancelar();
          return resp.status
        }

        this.sweetAlert.alertModal('error', resp.message)
        return resp.status
      })
  }

  cancelar() {
    this.form_park.reset();
    this.accion = "Agregar";
    this.sweetAlert.alertModal('info', 'Se han vaciado los campos del formulario')
  }

  isValid(campo: string) {
    return this.form_park.controls[campo].errors
      && this.form_park.controls[campo].touched;
  }

}
