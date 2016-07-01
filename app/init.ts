/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {Component} from 'angular2/core';
import {
	FormBuilder,
	Validators,
	Control,
	ControlGroup,
	FORM_DIRECTIVES
} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';

import { NumberValidator } from './validation/NumberValidator';


@Component({
    selector: 'cetes-app',
    templateUrl: 'app/html/inicio.html',
    directives: [FORM_DIRECTIVES]
})

export class CetesApp  {
	form: ControlGroup;

	valor_nominal: Control;
	tasa_descuento: Control;
	dias_vencer: Control;
	capital: Control;

	precio_bono: number          = 0;
	cetes_comprar: number        = 0;
	liquidacion_compra: number   = 0;
	liquidacion_venta: number    = 0;
	saldo_no_invertido: number   = 0;
	rendimiento_efectivo: number = 0;
	utilidad: number             = 0;


	constructor( private builder: FormBuilder ){
		console.log("inicio");
		//this.valor_nominal = 0;

		this.valor_nominal = new Control(
			10, 
			Validators.compose([Validators.required, NumberValidator.isTexto]),
			NumberValidator.usernameTaken
		);
		this.tasa_descuento = new Control(
			3.75, 
			Validators.compose([Validators.required, NumberValidator.isTexto]),
			NumberValidator.usernameTaken
		);
		this.dias_vencer = new Control(
			182, 
			Validators.compose([Validators.required, NumberValidator.isTexto]),
			NumberValidator.usernameTaken
		);
		this.capital = new Control(
			44651, 
			Validators.compose([Validators.required, NumberValidator.isTexto]),
			NumberValidator.usernameTaken
		);

		this.form = this.builder.group({
			valor_nominal: this.valor_nominal,
			tasa_descuento: this.tasa_descuento,
			dias_vencer: this.dias_vencer,
			capital: this.capital
		});
		this.precio_bono          = this.precioBono();
		this.cetes_comprar        = this.cetesComprar();
		this.liquidacion_compra   = this.liquidacionCompra();
		this.saldo_no_invertido   = this.saldoNoInvertido();
		this.liquidacion_venta    = this.liquidacionVenta();
		this.rendimiento_efectivo = this.redimientoEfectivo();
		this.utilidad             = this.getUtilidad();
	}


	precioBono(){
		return this.valor_nominal.value * ( ( ( this.tasa_descuento.value * this.dias_vencer.value ) / 360 ) - 1);
	}

	cetesComprar(){
		return Math.floor( this.capital.value / this.precio_bono );
	}

	liquidacionCompra(){
		return this.cetes_comprar * this.precio_bono;
	}

	liquidacionVenta(){
		return this.valor_nominal.value * this.cetes_comprar;
	}

	saldoNoInvertido(){
		return this.capital.value - this.liquidacion_compra;
	}

	redimientoEfectivo(){
		return ( this.liquidacion_venta / this.liquidacion_compra ) - 1;
	}

	getUtilidad(){
		return this.liquidacion_venta - this.liquidacion_compra;
	}

	onCalc(){
		console.log( "onCalc", this.capital );
		this.precio_bono          = this.precioBono();
		this.cetes_comprar        = this.cetesComprar();
		this.liquidacion_compra   = this.liquidacionCompra();
		this.saldo_no_invertido   = this.saldoNoInvertido();
		this.liquidacion_venta    = this.liquidacionVenta();
		this.rendimiento_efectivo = this.redimientoEfectivo();
		this.utilidad             = this.getUtilidad();
	}

}

bootstrap(CetesApp);
