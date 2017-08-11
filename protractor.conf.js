// protractor.conf.js
// Paulo Gonçalves

// Para garantir que variáveis não podem ser usadas se não forem definidas, gerando erro.
'use strict';

var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

module.exports.config =
{
    seleniumAddress: 'http://localhost:4444/wd/hub',
	
	// Parâmetro se determina se vai usar conexão direta ou não.
	// Pode ser 'true' apenas se o teste for executado apenas nos navegadores Mozilla Firefox e/ou Google Chrome.
	// Caso seja 'false', deve ser iniciado o webdriver a partir do CMD com o comando 'webdriver-manager start'.
	// Caso 'true', só executar o protractor e ficar feliz.
	directConnect: true,
	
	// multiCapabilities:
	// [
	// 	// {'browserName': 'internet explorer'},
	// 	// {'browserName': 'firefox'},
	// 	{'browserName': 'chrome'}
	// ],
	// maxSessions: 1,

	capabilities: {
		'browserName': 'chrome',
		shardTestFiles: true,
		maxInstances: 6
	},

	
	baseUrl: 'http://localhost:8080/RM/Rhu-BancoTalentos/',
	
	suites:
	{
		// Verificar conexão do Banco de Talentos com o host.
		Smoke: 'specs/Smoke.spec.js',
		
		// Testes
		Login: 'specs/Login.spec.js',
		QueroMeCadastrar: 'specs/QueroMeCadastrar.spec.js',
		Questionario: 'specs/Questionario.spec.js',
		Backlog: 'specs/Backlog.spec.js',
		TodasAsVagas: 'specs/TodasAsVagas.spec.js'
	},
	
	params:
	{
		TempoSleepPosBrowserGet: 1000,
		// Utilizado em QueroMeCadastrar.FecharMensagemBoasVindas
		TempoSleepFecharMensagemBoasVindas: 500,
		TempoSleepAguardarAcaoAbaDoPerfil: 500,
		Login:
		{
			SenhaPadrao: 'senha123'
		},
		// Utilizado em Questionarios.po.js
		TempoSleepAbrirFecharQuestionario: 600
	},
	
	// Tudo que deve ser executado antes do início dos testes.
	onPrepare: function()
	{
		
		// Organiza os resultados no Prompt de Comando.
		jasmine.getEnv().addReporter(new	SpecReporter(
		{
			displayFailuresSummary: true,
			displayFailedSpec: true,
			displaySuiteNumber: true,
			displaySpecDuration: true
		}));
		
		// Gera relatório de resultados no diretório especificado.
		jasmine.getEnv().addReporter(new	Jasmine2HtmlReporter(
		{
			takeScreenshots: true,
			fixedScreenshotName: true,
			savePath: '../Compartilhados/Relatorio_Protractor_-_Banco_de_Talentos/',
			fileNameDateSuffix: true,
			cleanDestination: false,
			takeScreenshotsOnlyOnFailures: true
		}));
		
		// Maximixa a janela do navegador.
		browser.driver.manage().window().maximize();
	}
	
};
