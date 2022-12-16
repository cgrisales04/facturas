export interface Factura {
    id_factura: string
    numero: string
    fecha: string
    valor_neto: number
    valor_iva: number
    valor_total: number
    id_activo: number
    id_proveedor: number
    id_etapa: number
    id_gasto: number
}


export interface ResponseGetHttp {
    status: boolean,
    data: Factura
}


export interface Facturas extends Array<Factura> { }