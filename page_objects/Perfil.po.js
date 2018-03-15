// Perfil.po.js
// Paulo Gonçalves

'use strict'

const Helper = require('../helper.js');

const helper = new Helper();

require('../ElementFinder.js');

class Perfil {

	constructor () {
		// Aba 'Formas de Contato'
		this.BotaoEditarFormasDeContato = element(by.css('[ng-click="controller.editFormasContato()"]'));
		this.BotaoSalvarFormasDeContato = element(by.css('[ng-click="controller.saveFormasContato()"]'));
		this.Pais = element.all(by.id('controller_modeledicao.ppessoaendereco[0].pais')).get(0);
		
		// Aba 'Perfil Profissional'
		this.BotaoEditarPerfilProfissional = element(by.css('[ng-click="controller.editPerfilProfissional()"]'));
		this.BotaoSalvarPerfilProfissional = element(by.css('[ng-click="controller.savePerfilProfissional()"]'));
		this.FormaDeContratacao = element(by.name('controller_modeledicao.vcandidatosperfilprof[0].codperfilcurr'));
		
		// Aba 'Form. Acadêmica'.
		this.BotaoAdicionarFormacaoAcademica = element(by.css('[ng-click="controller.addFormacaoAcademica()"]'));
		this.BotaoSalvarFormacaoAcademica = element(by.css('button[ng-click^="controller.saveFormacaoAcademica("]'));
		this.Curso = element(by.name('controller_modeledicao.vformacaoacad.codcurso'));
		this.OutroCurso = element(by.name('controller_modeledicao.vformacaoacad.outrocurso'));
		this.EntidadeEscola = element(by.name('controller_modeledicao.vformacaoacad.codentidade'));
		this.OutraEntidadeEscola = element(by.name('controller_modeledicao.vformacaoacad.nomeentidade'));
		this.GrauDeInstrucao = element(by.name('controller_modeledicao.vformacaoacad.codgrau'));
	}

	Visita() {
		browser.get('#/RM/Rhu-BancoTalentos/perfil');
	}

	// Aba 'Formas de Contato' ----------------------------------------------------------------------------|

	EditarFormasDeContato() {
		this.BotaoEditarFormasDeContato.Clicar();
		helper.AguardarElemento(this.BotaoSalvarFormasDeContato);
	}

	SetPais(país) {
		browser.sleep(200);
		helper.AguardarElementoEScrollAteElemento(this.Pais);
		browser.sleep(200);
		this.Pais.click();
		helper.SelecionarItemNaLista(país);
	}
		// Agrupador
	EditarAbaFormasSetPaisESalvar(Pais) {
		this.EditarFormasDeContato();
		this.SetPais(Pais);
		this.BotaoSalvarFormasDeContato.Clicar();
	}

	// Aba 'Perfil Profissional' ----------------------------------------------------------------------------|

		// Seleciona forma de contratação na lista. Parâmetros: 'Indefinido', 'Diversificado', 'Estagiário', 'Trainee (recém-formado)', 'Profissional (CLT)', 'Autônomo (PJ)' e 'FreeLancer (PF)'.
	SetFormaDeContratacao(Forma) {
		browser.sleep(200);
		helper.AguardarElementoEScrollAteElemento(this.FormaDeContratacao);
		browser.sleep(200);
		this.FormaDeContratacao.Clicar();
		helper.SelecionarItemNaLista(Forma);
	}

		// Agrupador
	EditarAbaPerfilSetFormaDeContratacaoESalvar(Forma) {
		this.BotaoEditarPerfilProfissional.Clicar();
		this.SetFormaDeContratacao(Forma);
		this.BotaoSalvarPerfilProfissional.Clicar();
	}

	// Aba 'Form. Acadêmica' ----------------------------------------------------------------------------|


	SetCurso(curso) {
		this.Curso.Clicar();
		helper.SelecionarItemNaLista(curso);	
	}

	SetEntidadeEscola(entidadeEscola) {
		this.EntidadeEscola.Clicar();
		helper.SelecionarItemNaLista(entidadeEscola);
	}

	SetGrauDeInstrucao(grauDeInstrucao) {
		this.GrauDeInstrucao.Clicar();
		helper.SelecionarItemNaLista(grauDeInstrucao);
	}

}

module.exports = Perfil;