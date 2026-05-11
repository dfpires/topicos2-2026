import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    home: TelaFormulario(),
    debugShowCheckedModeBanner: false,
  ));
}

class TelaFormulario extends StatefulWidget {
  @override
  _TelaFormularioState createState() => _TelaFormularioState();
}

class _TelaFormularioState extends State<TelaFormulario> {
  final TextEditingController _nomeController = TextEditingController();
  final TextEditingController _valorController = TextEditingController();

  void _enviarDados() {
    String nome = _nomeController.text;
    String valor = _valorController.text;
    if (nome.isNotEmpty && valor.isNotEmpty) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => TelaResumo(nome: nome, valor: valor),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Cadastro de Investimentos'),
        backgroundColor: Colors.indigo, // Corrigido: agora dentro da AppBar
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          children: [
            TextField(
              controller: _nomeController,
              decoration: InputDecoration(labelText: 'Nome'),
            ),
            TextField(
              controller: _valorController,
              decoration: InputDecoration(labelText: 'Valor'),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _enviarDados,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.indigo, // Visual do botão
              ),
              child: Text(
                'Ver Resumo',
                style: TextStyle(color: Colors.white), // Estilo dentro do Text
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TelaResumo extends StatelessWidget {
  final String nome;
  final String valor;

  TelaResumo({required this.nome, required this.valor});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Resumo do Investimento'),
        backgroundColor: Colors.orange, // Corrigido aqui também
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text("Olá, $nome", style: TextStyle(fontSize: 24)),
            SizedBox(height: 10),
            Text("Seu investimento é de $valor", style: TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}