import 'package:flutter/material.dart';
void main() => runApp(const MaterialApp(
  home: CalculadoraIMC(), // página inicial do app
  debugShowCheckedModeBanner: false, // retira banner de debug
));
// Widget de estado para a calculadora de IMC
class CalculadoraIMC extends StatefulWidget {
  const CalculadoraIMC({super.key}); // construtor da classe, recebe uma chave opcional
  // Sobrescreve o método createState para criar o estado da calculadora de IMC
  @override
  _CalculadoraIMCState createState() => _CalculadoraIMCState();
}
// Classe de estado para a calculadora de IMC
class _CalculadoraIMCState extends State<CalculadoraIMC> {  
  // controladores para os campos de entrada de peso e altura
  final TextEditingController _pesoController = TextEditingController();
  final TextEditingController _alturaController = TextEditingController();

  String _resultado = 'Informe os valores'; // variável para armazenar o resultado do cálculo do IMC
  String _classificacao = ''; // variável para armazenar a classificação do IMC
  
  _limpar() {
    _pesoController.clear(); // limpa o campo de peso
    _alturaController.clear(); // limpa o campo de altura
    setState(() {
      _resultado = 'Informe os valores'; // redefine o resultado para a mensagem inicial
      _classificacao = ''; // limpa a classificação
    });  
  }

  _calcular() {
    setState(() {
      double peso = double.parse(_pesoController.text); // converte o texto do campo de peso para um número
      double altura = double.parse(_alturaController.text); // converte o texto do campo de altura para um número
      double imc = peso / (altura * altura); // calcula o IMC usando a fórmula: peso / (altura^2)
      _resultado = 'IMC: ${imc.toStringAsFixed(2)}'; // formata o resultado do IMC para 2 casas decimais

    });
  }

  // anula o método build para construir a interface do usuário
  @override
  Widget build(BuildContext context) {
    // retorna um Scaffold, que é a estrutura básica de uma tela no Flutter
    return Scaffold(
      appBar: AppBar(
        title: Text('Calculadora de IMC'), // título da barra de aplicativo
        centerTitle: true, // centraliza o título
        backgroundColor: Colors.blueAccent, // cor de fundo da barra de aplicativo
        actions: [
          IconButton(
            icon: Icon(Icons.refresh), // ícone de atualização
            onPressed: () {
              _limpar(); // função para limpar os campos de entrada
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(20.0),
        child: Column(
          children: [
            Icon(Icons.person, size: 100, color: Colors.blueAccent), // ícone representando uma pessoa
            TextField(
              controller: _pesoController, // controlador para o campo de peso
              keyboardType: TextInputType.number, // tipo de teclado para entrada numérica
              decoration: InputDecoration(
                labelText: 'Peso (kg)', // rótulo do campo de peso
                hintText: 'Ex: 70.5', // borda ao redor do campo de entrada
              ),
            ),
            SizedBox(height: 10), // espaço vertical entre os campos
            TextField(
              controller: _alturaController, // controlador para o campo de altura
              keyboardType: TextInputType.number, // tipo de teclado para entrada numérica
              decoration: InputDecoration(
                labelText: 'Altura (m)', // rótulo do campo de altura
                hintText: 'Ex: 1.75', // borda ao redor do campo de entrada
              ),
            ),
            SizedBox(height: 30),
            ElevatedButton(
              onPressed: () {
                _calcular(); // função para calcular o IMC quando o botão for pressionado
              },
              child: Text('Calcular IMC'),
            ),
            Text(
              _resultado, // exibe o resultado do cálculo do IMC
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold), // estilo do texto do resultado
            ),
            SizedBox(height: 10), // espaço vertical entre o resultado e a classificação
            Text(
              _classificacao, // exibe a classificação do IMC
              style: TextStyle(fontSize: 18, color: Colors.grey[700]), // estilo do texto da classificação
            ),
          ]
        )
      ),
    );
  }
}