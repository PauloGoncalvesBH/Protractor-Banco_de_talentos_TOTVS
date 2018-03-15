// TodasAsVagas.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');
const DadosDaVaga = require('./DadosDaVaga.po.js');

require('../ElementFinder.js');

const helper = new Helper();
const dadosDaVaga = new DadosDaVaga();

class TodasAsVagas {
	constructor() {
		// Elementos para filtrar
		this.FiltroVaga = element(by.name('controller_model.vaga'));
		this.FiltroFuncao = element(by.name('controller_model.funcao'));
		this.FiltroLocalidade = element(by.name('controller_model.localidade'));
		this.BotaoFiltrar = element(by.css('[ng-click="controller.execFiltro();"]'));
		this.BotaoTodasAsVagas = element(by.css('[ng-click="controller.buscarTudo();"]'));
		this.NenhumaVagaEncontrada = element(by.cssContainingText('span', 'Nenhuma vaga encontrada!'));
	}

	Visita() {
		browser.get('#/RM/Rhu-BancoTalentos/painelVagas/lista');
	}

	FiltrarPorVaga(Vaga) {
		this.FiltroVaga.EnviarTexto(Vaga);
		this.BotaoFiltrar.Clicar();
	}

	AbrirVaga(Vaga) {
		element(by.cssContainingText('[ng-click="controller.exibirDetalhes(vaga)"]', Vaga)).Clicar();
	}

	FiltrarPorVagaAbrirECandidatar(Vaga) {
		helper.AcessarTodasAsVagas();
		
		// Filtra pela vaga através do campo 'Filtrar por Vaga'.
		this.FiltrarPorVaga(Vaga);
		
		// Abre a vaga.
		this.AbrirVaga(Vaga);
		
		// Candidata à vaga.
		dadosDaVaga.BotaoCandidatar.Clicar();
	}
}

module.exports = TodasAsVagas;	