// TodasAsVagas.po.js
// Paulo Gonçalves

var Helper = require('../helper.js');
var DadosDaVaga = require('../page_objects/DadosDaVaga.po.js');

var helper = new Helper();
var dadosDaVaga = new DadosDaVaga();

var TodasAsVagas = function() {
	// Elementos para filtrar
	this.FiltroVaga = element(by.name('controller_model.vaga'));
	this.FiltroFuncao = element(by.name('controller_model.funcao'));
	this.FiltroLocalidade = element(by.name('controller_model.localidade'));
	this.BotaoFiltrar = element(by.css('[ng-click="controller.execFiltro();"]'));
	this.BotaoTodasAsVagas = element(by.css('[ng-click="controller.buscarTudo();"]'));
	this.NenhumaVagaEncontrada = element(by.cssContainingText('span', 'Nenhuma vaga encontrada!'));
};

TodasAsVagas.prototype.Visita = function() {
	browser.get('#/RM/Rhu-BancoTalentos/painelVagas/lista');
	browser.sleep(browser.params.TempoSleepPosBrowserGet);
};

TodasAsVagas.prototype.FiltrarPorVaga = function(Vaga) {
	helper.ScrollAteElemento(this.FiltroVaga);
	this.FiltroVaga.sendKeys(Vaga);
	this.BotaoFiltrar.click();
};

TodasAsVagas.prototype.AbrirVaga = function(Vaga) {
	this.ElementoVaga = element.all(by.cssContainingText('[class="ng-binding"]',Vaga)).first();
	helper.ScrollAteElemento(this.ElementoVaga);
	this.ElementoVaga.click();
}

TodasAsVagas.prototype.FiltrarPorVagaAbrirECandidatar = function(Vaga) {
	// Filtra pela vaga através do campo 'Filtrar por Vaga'.
	this.FiltrarPorVaga(Vaga);
	
	// Abre a vaga.
	this.AbrirVaga(Vaga);
	
	// Candidata à vaga.
	dadosDaVaga.ClicarNoBotaoCandidatar();
};

module.exports = TodasAsVagas;	