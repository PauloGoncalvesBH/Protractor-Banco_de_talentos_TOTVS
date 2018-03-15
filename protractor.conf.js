// protractor.conf.js
// Paulo Gonçalves

'use strict'

const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

module.exports.config =
{
    seleniumAddress: 'http://localhost:4444/wd/hub',
	
	directConnect: true,	
	
	// chromeOptions: 'incognito', 'headless', 'disable-gpu', 'window-size=800x600'
   	multiCapabilities:
	[
		/*{'browserName': 'internet explorer', 'shardTestFiles': false, 'maxInstances': 1},
		{'browserName': 'firefox', 'shardTestFiles': false, 'maxInstances': 1},*/
		{'browserName': 'chrome', 'shardTestFiles': false, 'maxInstances': 3/*, 'chromeOptions': { 'args': ['headless', 'disable-gpu', 'window-size=800x600']}*/}
	],
	maxSessions: 1,
	
	baseUrl: 'http://bhd050101847:8080/RM/Rhu-BancoTalentos/',
	
	// Para executar suite de teste específica -> protractor --suite=Backlog
	// Organizado por ordem decrescente de tempo de execução.
	suites:
	{
		// Testes
		QueroMeCadastrar: 'specs/QueroMeCadastrar.spec.js',
		Backlog: 'specs/Backlog.spec.js',
		Questionario: 'specs/Questionario.spec.js',
		TodasAsVagas: 'specs/TodasAsVagas.spec.js',
		Login: 'specs/Login.spec.js',

		// Verifica a conexão do Banco de Talentos com o host.
		Smoke: 'specs/Smoke.spec.js'
	},
	
	params:
	{
		/* Tempo utilizado em: 
		1 - No ImplicitlyWait no onPrepare do Conf.js
		2 - No método AguardarElemento no helper.js */
		TempoEmMilissegundosTimeout: 10000,
		Login:
		{
			SenhaPadrao: 'senha123'
		}
	},

	onPrepare: function()
	{
		// Organiza os resultados no Prompt de Comando.
		jasmine.getEnv().addReporter(new SpecReporter(
		{
			displayFailuresSummary: true,
			displayFailedSpec: true,
			displaySuiteNumber: true,
			displaySpecDuration: true
		}));
		
		// Gera relatório de resultados no diretório especificado.
		jasmine.getEnv().addReporter(new Jasmine2HtmlReporter(
		{
			takeScreenshots: true,
			savePath: 'report/',
			fileNamePrefix: 'Automação Banco de Talentos',
			fileNameSeparator: '-',
			fileNameDateSuffix: true,
			cleanDestination: true,
			takeScreenshotsOnlyOnFailures: true
		}));
		
    	browser.manage().timeouts().implicitlyWait(browser.params.TempoEmMilissegundosTimeout)
		browser.driver.manage().window().maximize();
	},
};
