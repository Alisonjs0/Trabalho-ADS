import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import Navbar from "@/components/navbar";
import { useNavigation } from "@react-navigation/native";

import { useState, useEffect } from 'react';
import api from '@/app/api/axios/api';

type Unidade = {
  id: number;
  name: string;
  extinguisherAmount: number;
  userId: {
    id: number;
    nome: string;
    email: string;
    cpf: string;
    cargo: string;
    senha: string | null;
    setor: string | null;
  };
};

export default function Dashboard() {
  const navigation = useNavigation();

  const handleNavigate = (screen: string) => {
    navigation.navigate(screen as never); // typecast para evitar erro de tipo
  };

  
  const [units, setUnits] = useState<Unidade[]>([]);
  const [amount, setAmount] = useState(0);
const getUnits = async () => {
  try {
    const response = await api.get('/unit');
    setUnits(response.data);
  } catch (error) {
    console.error('Erro ao buscar unidades:', error);
  }
};

// Chama apenas uma vez no carregamento
useEffect(() => {
  getUnits();
}, []);

// Atualiza o amount sempre que units mudar
useEffect(() => {
  if (units.length > 0) {
    const total = units.reduce(
      (acc, unidade) => acc + (unidade.extinguisherAmount || 0),
      0
    );
    setAmount(total);
  }
}, [units]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.helloContainer}>
          <View style={styles.helloRow}>
            <Text style={styles.helloText}>Olá, Arthur</Text>
            <MaterialIcons
              name="local-fire-department"
              size={20}
              color="#fff"
            />
          </View>
          <Text style={styles.welcomeText}>Bem vindo de volta!</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verificar Setores</Text>
          <Link href="/">
            <Ionicons name="chevron-forward" size={22} color="#333" />
          </Link>
        </View>

        <Link href="/" style={styles.cardLink}>
          <View style={styles.card}>
            <Image
              source={require("@/assets/images/extintor.png")}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.cardValue}>Total de Extintores</Text>
              <View style={styles.extintorRow}>
                <Text style={styles.extintorNumber}>{amount}</Text>
                <View style={styles.statusTag}>
                  <Text style={styles.statusText}>25% Manutenção</Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>
                Verifique a quantidade total de extintores.
              </Text>
            </View>
          </View>
        </Link>

        <View style={styles.imageCard}>
          <Image
            source={require("@/assets/images/Extintores.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>Alinhamento reduz custos.</Text>
            <Feather name="heart" size={18} color="#D32B2D" />
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactText}>Contate fornecedores</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Reutilizando Navbar */}
      <Navbar onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#D32B2D",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  helloContainer: {},
  helloRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  helloText: { color: "#fff", fontSize: 16 },
  welcomeText: { color: "#fff", fontWeight: "bold", fontSize: 18 },

  scrollContent: { padding: 20 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },

  card: {
    flexDirection: "row",
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    padding: 15,
    alignItems: "flex-start",
    marginBottom: 20,
    elevation: 2,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  extintorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  extintorNumber: {
    fontSize: 22,
    fontWeight: "bold",
    marginRight: 10,
  },
  statusTag: {
    backgroundColor: "#FDDCDC",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: { fontSize: 12, color: "#D32B2D", fontWeight: "bold" },
  cardDescription: { fontSize: 13, color: "#555", marginTop: 5 },

  dots: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  dotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#D32B2D",
    marginHorizontal: 4,
  },

  imageCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  cardImage: {
    width: "100%",
    height: 140,
  },
  cardContent: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 15,
    fontWeight: "500",
  },
  contactButton: {
    backgroundColor: "#D32B2D",
    margin: 10,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  contactText: {
    color: "#fff",
    fontWeight: "bold",
  },

  cardLink: {
    marginBottom: 20,
  },
});
