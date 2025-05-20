import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Navbar from '@/components/navbar'; // ajuste o caminho conforme necessário
import { useNavigation } from '@react-navigation/native';

export default function UserProfile() {
  const navigation = useNavigation();

  const opcoes = [
    { icon: <Ionicons name="person-outline" size={20} />, label: 'Informações pessoais' },
    { icon: <Ionicons name="shield-checkmark-outline" size={20} />, label: 'Segurança' },
    { icon: <MaterialCommunityIcons name="sitemap-outline" size={20} />, label: 'Cadastre setor', screen: 'sector_register/page' },
    { icon: <MaterialCommunityIcons name="fire-extinguisher" size={20} />, label: 'Cadastre extintor', screen: 'extin_register/page' },
    { icon: <Ionicons name="person-add-outline" size={20} />, label: 'Cadastre usuário', screen: 'user_register/page' },
    { icon: <Ionicons name="help-circle-outline" size={20} />, label: 'Suporte' },
  ];

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never); // necessário para compatibilidade com types
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.title}>Perfil do usuário</Text>
          </View>

          {opcoes.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                if (item.screen) {
                  handleNavigate(item.screen);
                }
              }}
            >
              <View style={styles.optionContent}>
                {item.icon}
                <Text style={styles.optionText}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logout}>
            <Ionicons name="log-out-outline" size={20} color="#D32B2D" />
            <Text style={styles.logoutText}>Sair da conta</Text>
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
    gap: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  option: {
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    elevation: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 15,
    color: '#222',
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 30,
    backgroundColor: '#f7f7f7',
    padding: 14,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#D32B2D',
  },
});
