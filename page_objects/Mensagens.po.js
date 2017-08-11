// Mensagens.po.js
// Paulo Gonçalves

var Mensagens = function()
{
	// Mensagens tela 'Login'
	this.MensagemLoginSucesso = element.all(by.cssContainingText('div', 'Login efetuado com sucesso!')).get(0);
	this.MensagemNaoCadastrado = element.all(by.cssContainingText('div', 'Você ainda não está cadastrado em nosso Banco de Talentos. Acesse o item de menu Quero me cadastrar.')).get(0);
	
	// Mensagens tela 'Quero Me Cadastrar'
	this.MensagemEmailNaoConfere = element.all(by.cssContainingText('div', "Os e-mail's digitados não conferem")).get(0);
	this.MensagemSenhaNaoConfere = element.all(by.cssContainingText('div', 'A senha e sua confirmação digitada não conferem')).get(0);
	this.MensagemSenhaInvalida = element.all(by.cssContainingText('div', 'Sua senha deve ter pelo menos 6 caracteres (combinação de letras e números)')).get(0);
	this.MensagemCPFInvalido = element.all(by.cssContainingText('div', 'Informe um CPF válido')).get(0);
	this.MensagemEmailExistente = element.all(by.cssContainingText('div', 'Este e-mail já está cadastrado! Favor informar outro e-mail para se cadastrar ou preencha os dados de acesso no cabeçalho da página para acessar um cadastro já existente.')).get(0);
	this.MensagemUsuarioExistente = element.all(by.cssContainingText('div', 'Este usuário já está cadastrado! Favor informar outro usuário para se cadastrar ou preencha os dados de acesso no cabeçalho da página para acessar um cadastro já existente.')).get(0);

	// Mensagens tela 'Perfil'
	this.FormasDeContatoAtualizada = element.all(by.cssContainingText('div','Formas de contato atualizadas com sucesso!')).get(0);
	this.PerfilProfissionalAtualizada = element.all(by.cssContainingText('div','Perfil Profissional atualizado com sucesso!')).get(0);
	this.FormacaoAcademicaSalva = element.all(by.cssContainingText('div','Formação Acadêmica salva com sucesso!')).get(0);
	
	// Mensagens de candidatura
	this.MensagemCandidaturaComSucesso = element.all(by.cssContainingText('div','Candidatura efetuada com sucesso para esta vaga!')).get(0);
	this.MaximoDeUmaVagaCandidatadaAtingida = element.all(by.cssContainingText('div','Agradecemos o seu interesse. Entretanto, é possível concorrer apenas a 1 vagas(s) simultaneamente.')).get(0);
		// Mensagens de alerta que são emitidas apenas quando o parâmetro 'Consistir preenchimento mínimo do Currículo' está marcado.
	this.MensagemImpedimentoAbaFormasDeContato = element.all(by.cssContainingText('div','Preencha os campos obrigatórios do Perfil na Aba de Formas de Contato, antes de se candidatar a vaga!')).get(0);
	this.MensagemImpedimentoAbaPerfilProfissional = element.all(by.cssContainingText('div','Preencha os campos obrigatórios do Perfil na Aba de Perfil Profissional, antes de se candidatar a vaga!')).get(0);
	this.MensagemAlertaAbaFormAcademica = element.all(by.cssContainingText('div','Para aumentar sua empregabilidade sugerimos preencher os campos do Perfil na Aba de Form. Acadêmica')).get(0);

	
	// Mensagens tela 'Questionários'
	this.QuestionarioSalvoComSucesso = element.all(by.cssContainingText('div', 'Questionário respondido com sucesso!')).get(0);
	this.AlertaQuestao1NaoPreenchida = element.all(by.cssContainingText('div', 'A questão código 1 é de resposta obrigatória!')).get(0);
};

module.exports = Mensagens;