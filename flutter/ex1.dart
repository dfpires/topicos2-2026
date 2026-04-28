import 'package:flutter/material.dart';
void main() => runApp(MeuApp());
class MeuApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: TelaContador(),
    );
  }
}
class TelaContador extends StatefulWidget {
  @override
  _TelaContadorState createState() => _TelaContadorState();
}

class _TelaContadorState extends State<TelaContador> {
    int contador = 0;
    void incrementar() {
      setState(() => contador++); // Atualiza a UI
    }
      @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Exemplo 1 - Contador")),
      body: Center(
        child: Text("Cliques: $contador", style: TextStyle(fontSize: 25)),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: incrementar,
        child: Icon(Icons.add),
      ),
    );
  }

}

