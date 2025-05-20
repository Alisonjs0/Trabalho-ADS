import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import Navbar from '@/components/navbar'; // ajuste conforme seu caminho

export default function RegisterExtintor() {
  const navigation = useNavigation();

  const [setorOpen, setSetorOpen] = useState(false);
  const [setorValue, setSetorValue] = useState(null);
  const [setorItems, setSetorItems] = useState([
    { label: 'Administração', value: 'admin' },
    { label: 'Produção', value: 'producao' },
    { label: 'Armazém', value: 'armazem' },
  ]);

  const [tipoAgenteOpen, setTipoAgenteOpen] = useState(false);
  const [tipoAgenteValue, setTipoAgenteValue] = useState(null);
  const [tipoAgenteItems, setTipoAgenteItems] = useState([
    { label: 'Pó químico', value: 'po' },
    { label: 'CO₂', value: 'co2' },
    { label: 'Água', value: 'agua' },
  ]);

  const [categoriaOpen, setCategoriaOpen] = useState(false);
  const [categoriaValue, setCategoriaValue] = useState(null);
  const [categoriaItems, setCategoriaItems] = useState([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' },
    { label: 'K', value: 'K' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Novo Extintor</Text>
        </View>

        <TextInput style={styles.input} placeholder="Leia ou Digite QR" />
        
        <DropDownPicker
          open={setorOpen}
          value={setorValue}
          items={setorItems}
          setOpen={setSetorOpen}
          setValue={setSetorValue}
          setItems={setSetorItems}
          placeholder="Selecione o setor"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TextInput style={styles.input} placeholder="Ex: 23/01/2025" />
        <TextInput style={styles.input} placeholder="Ex: 23/01/2025" />
        <TextInput style={styles.input} placeholder="Ex: 23/01/2025" />

        <DropDownPicker
          open={tipoAgenteOpen}
          value={tipoAgenteValue}
          items={tipoAgenteItems}
          setOpen={setTipoAgenteOpen}
          setValue={setTipoAgenteValue}
          setItems={setTipoAgenteItems}
          placeholder="Tipo do Agente"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <DropDownPicker
          open={categoriaOpen}
          value={categoriaValue}
          items={categoriaItems}
          setOpen={setCategoriaOpen}
          setValue={setCategoriaValue}
          setItems={setCategoriaItems}
          placeholder="Categoria"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar Extintor</Text>
        </TouchableOpacity>
      </ScrollView>

      <Navbar onNavigate={(screen) => navigation.navigate(screen as never)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  dropdown: {
    borderRadius: 10,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  dropdownContainer: {
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#D32B2D',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
