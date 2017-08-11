// DadosDaVaga.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');

var helper = new Helper();


var DadosDaVaga = function() {
	this.BotaoVoltar = element(by.css('[ng-click="controller.voltaPaginaAnterior();"]'));
	this.BotaoCandidatar = element(by.css('[ng-click="controller.candidatarVaga();"]'));
	this.BotaoFecharImpedimento = element(by.css('[ng-click="ok()"]'));
};

DadosDaVaga.prototype.ClicarNoBotaoVoltar = function() {
	helper.ScrollAteElemento(this.BotaoVoltar);
	this.BotaoVoltar.click();
};

DadosDaVaga.prototype.ClicarNoBotaoCandidatar = function() {
	helper.ScrollAteElemento(this.BotaoCandidatar);
	this.BotaoCandidatar.click();
};

DadosDaVaga.prototype.FecharImpedimento = function() {
	helper.ScrollAteElemento(this.BotaoFecharImpedimento);
	this.BotaoFecharImpedimento.click();
};

module.exports = DadosDaVaga;	