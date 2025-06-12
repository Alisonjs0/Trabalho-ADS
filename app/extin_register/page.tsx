import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

import Navbar from '@/components/navbar';
import api from '@/app/api/axios/api';

export default function RegisterExtintor() {
  const navigation = useNavigation();

  const [fabricacao, setFabricacao] = useState<Date | null>(null);
  const [validade, setValidade] = useState<Date | null>(null);
  const [showFabricacaoPicker, setShowFabricacaoPicker] = useState(false);
  const [showValidadePicker, setShowValidadePicker] = useState(false);

  const [setorOpen, setSetorOpen] = useState(false);
  const [setorValue, setSetorValue] = useState(null);
  const [setorItems, setSetorItems] = useState([
    { label: 'Administração', value: '1' },
    { label: 'Produção', value: '2' },
    { label: 'Armazém', value: '3' },
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

  const formatDateToString = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateToISO = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const criarExtintor = async () => {
    if (!setorValue || !validade || !fabricacao || !tipoAgenteValue || !categoriaValue) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await api.post('/extinguisher', {
        agentType: tipoAgenteValue,
        fireClass: categoriaValue,
        unitId: {
          id: setorValue,
        },
        manufacturingDate: formatDateToISO(fabricacao),
        validate: formatDateToISO(validade),
        capacity: 10.2,
        equipmentId: {
          id: 5,
        }
      });

      console.log(response.data);

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Extintor cadastrado com sucesso!');

        setSetorValue(null);
        setFabricacao(null);
        setValidade(null);
        setTipoAgenteValue(null);
        setCategoriaValue(null);

      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o extintor. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar extintor:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor ou houve um problema no cadastro.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>Novo Extintor</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Setor</Text>
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
            zIndex={setorOpen ? 3000 : 1000}
            onOpen={() => {
              setTipoAgenteOpen(false);
              setCategoriaOpen(false);
            }}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Data de Fabricação</Text>
          <TouchableOpacity onPress={() => setShowFabricacaoPicker(true)} style={styles.input}>
            <Text>{fabricacao ? formatDateToString(fabricacao) : 'Selecione a data'}</Text>
          </TouchableOpacity>
          {showFabricacaoPicker && (
            <DateTimePicker
              value={fabricacao || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => {
                setShowFabricacaoPicker(false);
                if (selectedDate) setFabricacao(selectedDate);
              }}
            />
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Data de Validade</Text>
          <TouchableOpacity onPress={() => setShowValidadePicker(true)} style={styles.input}>
            <Text>{validade ? formatDateToString(validade) : 'Selecione a data'}</Text>
          </TouchableOpacity>
          {showValidadePicker && (
            <DateTimePicker
              value={validade || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedDate: Date | undefined) => {
                setShowValidadePicker(false);
                if (selectedDate) setValidade(selectedDate);
              }}
            />
          )}
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Tipo do Agente</Text>
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
            zIndex={tipoAgenteOpen ? 2000 : 900}
            onOpen={() => {
              setSetorOpen(false);
              setCategoriaOpen(false);
            }}
          />
        </View>

        <View style={styles.formSection}>
          <Text style={styles.label}>Classe do Incêndio</Text>
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
            zIndex={categoriaOpen ? 1000 : 800}
            onOpen={() => {
              setSetorOpen(false);
              setTipoAgenteOpen(false);
            }}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={criarExtintor}>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
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
  formSection: {
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
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
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
