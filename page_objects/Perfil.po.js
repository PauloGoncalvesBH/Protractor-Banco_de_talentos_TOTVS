// Perfil.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');

var helper = new Helper();


var Perfil = function() {	
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
};

Perfil.prototype.Visita = function() {
	browser.get('#/RM/Rhu-BancoTalentos/perfil');
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

// Aba 'Formas de Contato' ----------------------------------------------------------------------------|

Perfil.prototype.EditarFormasDeContato = function() {
	helper.ScrollAteElemento(this.BotaoEditarFormasDeContato);
	this.BotaoEditarFormasDeContato.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

Perfil.prototype.SetPais = function(paisdois) {
	helper.ScrollAteElemento(this.Pais);
	this.Pais.click();
	helper.SelecionarItemNaLista(paisdois);
};

Perfil.prototype.SalvarFormasDeContato = function() {
	helper.ScrollAteElemento(this.BotaoSalvarFormasDeContato);
	this.BotaoSalvarFormasDeContato.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

	// Agrupador
Perfil.prototype.EditarAbaFormasSetPaisESalvar = function(Pais) {
	this.EditarFormasDeContato();
	this.SetPais(Pais);
	this.SalvarFormasDeContato();
};

// Aba 'Perfil Profissional' ----------------------------------------------------------------------------|

Perfil.prototype.EditarPerfilProfissional = function() {
	helper.ScrollAteElemento(this.BotaoEditarPerfilProfissional);
	this.BotaoEditarPerfilProfissional.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

	// Seleciona forma de contratação na lista. Parâmetros: 'Indefinido', 'Diversificado', 'Estagiário', 'Trainee (recém-formado)', 'Profissional (CLT)', 'Autônomo (PJ)' e 'FreeLancer (PF)'.
Perfil.prototype.SetFormaDeContratacao = function(Forma) {
	helper.ScrollAteElemento(this.FormaDeContratacao);
	this.FormaDeContratacao.click();
	helper.SelecionarItemNaLista(Forma);
};

Perfil.prototype.SalvarPerfilProfissional = function() {
	helper.ScrollAteElemento(this.BotaoSalvarPerfilProfissional);
	this.BotaoSalvarPerfilProfissional.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

	// Agrupador
Perfil.prototype.EditarAbaPerfilSetFormaDeContratacaoESalvar = function(Forma) {
	this.EditarPerfilProfissional();
	this.SetFormaDeContratacao(Forma);
	this.SalvarPerfilProfissional();
};

// Aba 'Form. Acadêmica' ----------------------------------------------------------------------------|

Perfil.prototype.AdicionarFormacaoAcademica = function() {
	helper.ScrollAteElemento(this.BotaoAdicionarFormacaoAcademica);
	this.BotaoAdicionarFormacaoAcademica.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

Perfil.prototype.SalvarFormacaoAcademica = function() {
	helper.ScrollAteElemento(this.BotaoSalvarFormacaoAcademica);
	this.BotaoSalvarFormacaoAcademica.click();
	browser.sleep(browser.params.TempoSleepAguardarAcaoAbaDoPerfil);
};

Perfil.prototype.SetCurso = function(curso) {
	helper.ScrollAteElemento(this.Curso);
	this.Curso.click();
	helper.SelecionarItemNaLista(curso);	
}

Perfil.prototype.SetOutroCurso = function(outroCurso) {
	helper.ScrollAteElemento(this.OutroCurso);
	this.OutroCurso.sendKeys(outroCurso);
}

Perfil.prototype.SetEntidadeEscola = function(entidadeEscola) {
	helper.ScrollAteElemento(this.EntidadeEscola);
	this.EntidadeEscola.click();
	helper.SelecionarItemNaLista(entidadeEscola);
}

Perfil.prototype.SetOutraEntidadeEscola = function(outraEntidadeEscola) {
	helper.ScrollAteElemento(this.OutraEntidadeEscola);
	this.OutraEntidadeEscola.sendKeys(outraEntidadeEscola);
}

Perfil.prototype.SetGrauDeInstrucao = function(grauDeInstrucao) {
	helper.ScrollAteElemento(this.GrauDeInstrucao);
	this.GrauDeInstrucao.click();
	helper.SelecionarItemNaLista(grauDeInstrucao);
}

module.exports = Perfil;




