import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";

import { useNavigation } from '@react-navigation/native';

import api from "@/app/api/axios/api";

type ErrosCadastro = {
  nome?: string;
  cpf?: string;
  email?: string;
  senha?: string;
  setor?: string;
  cargo?: string;
};

export default function CadastroUsuario() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [setor, setSetor] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erros, setErros] = useState<ErrosCadastro>({});

const validar = async () => {
  const novosErros: ErrosCadastro = {};

  if (!nome.trim()) novosErros.nome = "Nome obrigatório";
  if (!cpf.trim()) novosErros.cpf = "CPF obrigatório";
  if (!cargo.trim()) novosErros.cargo = "  obrigatório";
  if (!setor) novosErros.setor = "Setor obrigatório";
  if (!email.includes("@")) novosErros.email = "Email incorreto";
  if (senha.length < 6) novosErros.senha = "Senha incorreta";
  if (senha !== confirmarSenha) novosErros.senha = "Senhas diferentes";

  setErros(novosErros);

  console.log("Dados digitados:", { nome, cargo, setor, email, senha });

  if (Object.keys(novosErros).length > 0) {
    console.log("Validação falhou:", novosErros);
    return;
  }

  try {
    console.log("Enviando dados para API...");

    const response = await api.post("/users", {
      nome,
      cpf,
      cargo,
      setor,
      email,
      senha
    });


    console.log("Resposta da API:", response.data);

    if (response.status === 201 || response.status === 200) {
      console.log("Cadastro realizado com sucesso!");
      
      setNome("");
      setCpf("");
      setCargo("");
      setSetor("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");
    } else {
      console.log("Erro: resposta inesperada da API");
    }
  } catch (error: any) {
    console.error("Erro ao cadastrar:", error?.response?.data || error.message);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.voltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.titulo}>Cadastrar usuários</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.formulario}>
        <View style={styles.campo}>
          <Text style={styles.label}>
            Nome {erros.nome && <Text style={styles.erro}>({erros.nome})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arthuro Vidalgo"
            value={nome}
            onChangeText={setNome}
          />
        </View>

                <View style={styles.campo}>
          <Text style={styles.label}>
            CPF {erros.cpf && <Text style={styles.erro}>({erros.cpf})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Arthuro Vidalgo"
            value={cpf}
            onChangeText={setCpf}
            maxLength={11}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>
            Cargo{" "}
            {erros.cargo && <Text style={styles.erro}>({erros.cargo})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Responsável"
            value={cargo}
            onChangeText={setCargo}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>
            Setor{" "}
            {erros.setor && <Text style={styles.erro}>({erros.setor})</Text>}
          </Text>
          <View style={styles.input}>
            <Picker
              selectedValue={setor}
              onValueChange={(e) => setSetor(e)}
              style={styles.picker}
              dropdownIconColor="#555"
            >
              <Picker.Item
                label="Selecione um setor..."
                value=""
                style={styles.placeholderPicker}
              />
              <Picker.Item label="Setor 1" value="setor1" />
              <Picker.Item label="Setor 2" value="setor2" />
              <Picker.Item label="Setor 3" value="setor3" />
            </Picker>
          </View>
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>
            Email{" "}
            {erros.email && <Text style={styles.erro}>({erros.email})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: arthurleal@gmail.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>
            Senha{" "}
            {erros.senha && <Text style={styles.erro}>({erros.senha})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 123123123"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>
            Confirmar Senha{" "}
            {erros.senha && <Text style={styles.erro}>({erros.senha})</Text>}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 123123123"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={validar}>
          <Text style={styles.botaoTexto}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  voltar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  formulario: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  campo: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 4,
  },
  erro: {
    color: "#D32B2D",
    fontWeight: "bold",
    fontSize: 12,
  },
  input: {
    backgroundColor: "#f3f3f3",
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    height: 44,
    justifyContent: "center",
  },
  picker: {
    fontSize: 14,
    color: "#000",
    flex: 1,
  },
  placeholderPicker: {
    color: "#9e9e9e",
    fontSize: 14,
  },
  botao: {
    backgroundColor: "#D32B2D",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
