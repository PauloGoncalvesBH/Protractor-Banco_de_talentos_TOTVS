//	helper.js
// Paulo Gonçalves

'use strict'

const shortid = require('shortid');
require('./ElementFinder.js');

class Helper {

	constructor() {
		// Menus de acesso às paginas
		this.Home = element(by.css('[href="#/RM/Rhu-BancoTalentos/home"]'));
		this.Perfil = element(by.css('[href="#/RM/Rhu-BancoTalentos/perfil"]'));

		this.PainelDeVagas = element(by.css("[data-toggle='dropdown'][role='button']"));
		this.TodasAsVagas = element(by.css('[href="#/RM/Rhu-BancoTalentos/painelVagas/lista"]'));
		this.VagasQueEstouConcorrendo = element(by.css('[href="#/RM/Rhu-BancoTalentos/home"]'));
		this.Questionarios = element(by.css('[href="#/RM/Rhu-BancoTalentos/questionarios_geral/lista"]'));
		
		this.TextoVejaMais = element.all(by.cssContainingText('div', 'Veja mais:')).get(0);
		this.TextoAnexarCurriculo = element.all(by.cssContainingText('div', 'Anexar Currículo')).get(0);
		this.TextoPainelDeVagas = element.all(by.cssContainingText('h2', 'Painel de Vagas')).get(0);
		this.TextoQuestionarios = element.all(by.cssContainingText('h2', 'Questionários')).get(0);
	}

	

	AguardarElementoEScrollAteElemento(elemento) {
		this.AguardarElemento(elemento);
		this.ScrollAteElemento(elemento);
	}

	AguardarElemento(elemento) {
		browser.wait(protractor.ExpectedConditions.elementToBeClickable(elemento), browser.params.TempoEmMilissegundosTimeout)
	}

	ScrollAteElemento(elemento) {
		browser.executeScript('arguments[0].scrollIntoView(true);', elemento); 
	}

	// Função que seleciona um item em uma lista que é aberta após clicar no campo.
	SelecionarItemNaLista(Item) {
		browser.sleep(100);
		element.all(by.cssContainingText('a',Item)).get(0).Clicar();
		browser.sleep(100);
	}

	// #region Menu de acesso as paginas
	AcessarHome() {
		this.Home.Clicar();
		this.AguardarElemento(this.TextoVejaMais);
	}

	AcessarPerfil() {
		this.Perfil.Clicar();
		this.AguardarElemento(this.TextoAnexarCurriculo);
	}

	AcessarTodasAsVagas() {
		this.PainelDeVagas.Clicar();
		this.TodasAsVagas.Clicar();
		this.AguardarElemento(this.TextoPainelDeVagas);
	}

	AcessarVagasQueEstouConcorrendo() {
		this.PainelDeVagas.Clicar();
		this.VagasQueEstouConcorrendo.Clicar();
		this.AguardarElemento(this.TextoPainelDeVagas);
	}

	AcessarQuestionarios() {
		this.Questionarios.Clicar();
		this.AguardarElemento(this.Questionarios);
	}
	// #endregion

	RecarregarPagina() {
		// browser.sleep(3000);
		browser.refresh();
	}

	randomiza(n) {
		return Math.round(Math.random()*n);
	}
	
	mod(dividendo,divisor) {
		return Math.round(dividendo - (Math.floor(dividendo/divisor)*divisor));
	}
	
	GerarCPF() {
		
		
		// False = Sem pontuação. True = Com pontuação.
		let comPontos = false;
		
		const n = 9;
		const n1 = this.randomiza(n);
		const n2 = this.randomiza(n);
		const n3 = this.randomiza(n);
		const n4 = this.randomiza(n);
		const n5 = this.randomiza(n);
		const n6 = this.randomiza(n);
		const n7 = this.randomiza(n);
		const n8 = this.randomiza(n);
		const n9 = this.randomiza(n);
		let d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
		d1 = 11 - ( this.mod(d1,11) );

		if (d1>=10) {
			d1 = 0;
		}
			
		let d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;

		d2 = 11 - ( this.mod(d2,11) );

		if (d2 >= 10) {
			d2 = 0;
		}

		// retorno = '';
		let cpf;

		if (comPontos) {
			cpf = ''+n1+n2+n3+'.'+n4+n5+n6+'.'+n7+n8+n9+'-'+d1+d2;
		} else {
			cpf = ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
		}
				
		return cpf;
	}

	GerarCaracteres() {
		return shortid.generate();
	}

	GerarEmail() {
		return this.GerarCaracteres() + '@totvs.com';
	}

	GerarUsuario() {
		return this.GerarCaracteres() + this.GerarCaracteres();
	}

}

module.exports = Helper;