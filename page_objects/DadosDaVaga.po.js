// DadosDaVaga.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');

const helper = new Helper();
require('../ElementFinder.js');

class DadosDaVaga {

	constructor() {
		this.BotaoVoltar = element(by.css('[ng-click="controller.voltaPaginaAnterior();"]'));
		this.BotaoCandidatar = element(by.css('[ng-click="controller.candidatarVaga();"]'));
		this.BotaoFecharImpedimento = element(by.css('[ng-click="ok()"]'));
	}
	
}

module.exports = DadosDaVaga;