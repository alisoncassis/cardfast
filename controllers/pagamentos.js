module.exports = function(app){

  app.post('/cartoes/autoriza', function(req, res){
    console.log('processando pagamento com cartao');

    var cartao = req.body;

    req.assert('numero',
      'numero com 16 digitos obrigatorios').notEmpty().len(16,16);
    req.assert('bandeira',
      'bandeira obrigatoria').notEmpty();
    req.assert('ano_de_expiracao',
      'ano de expiracao 4 digitos obrigatorios').notEmpty().len(4,4);
    req.assert('mes_de_expiracao',
      'mes de expiracao 2 digitos obrigatorios').notEmpty().len(2,2);
    req.assert('cvv',
      'cvv com 3 caracteres obrigatorios').notEmpty().len(3,3);

    var erros =req.validationErrors();
    if(erros){
      console.log('erros de validacao nos dados do cartao');
      res.status(400).send(erros);
      return;
    } else {
      cartao.status = 'AUTORIZADO';

      var response = {
        dados_do_cartao: cartao,
      }
      // links: [
      //   {
      //     href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
      //     rel: 'confirmar',
      //     method: 'PUT'
      //   },
      //   {
      //     href: 'http://localhost:3000/pagamentos/pagamento/' + pagamento.id,
      //     rel: 'cancelar',
      //     method: 'DELETE'
      //   }
      // ]
      res.status(201).json(response);
      console.log('cartao autorizado com sucesso');
      return;
    }
  });
};
