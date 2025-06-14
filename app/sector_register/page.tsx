import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Navbar from '@/components/navbar'; // ajuste o caminho conforme necessário

import api from "@/app/api/axios/api";

export default function RegisterSector() {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never);
  };

  const handleSubmit = async () => {
    if (!nome) {
      Alert.alert('Erro', 'Por favor, preencha o nome da unidade.');
      return;
    }

    try {
      const response = await api.post('/unit', {
        name: nome
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Unidade cadastrada com sucesso!');
        setNome('');
      }
    } catch (error) {
      console.error('Erro ao cadastrar unidade:', error);
      Alert.alert('Erro', 'Ocorreu um problema ao se conectar com o servidor.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Cadastrar Unidate</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Setor 1B"
              value={nome}
              onChangeText={(e => setNome(e))}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Cadastrar Setor</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <Navbar onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: '#222',
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    elevation: 1,
  },
  button: {
    backgroundColor: '#D32B2D',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
