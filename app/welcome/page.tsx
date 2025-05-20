import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { TouchableOpacity } from 'react-native';



export default function SomeComponent() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dificuldade com a manutenção do seu sistema?</Text>
      <Text style={styles.subTitle}>Apagamos seu problema!</Text>

      <View style={styles.item}>
        <MaterialIcons name="location-pin" size={24} color="#D32B2D" style={styles.icon} />
        <View>
          <Text style={styles.itemTitle}>Localize Extintores</Text>
          <Text style={styles.itemText}>Descubra em tempo real, onde estão localizados e a situação de cada um.</Text>
        </View>
      </View>

      <View style={styles.item}>
        <FontAwesome5 name="barcode" size={20} color="#D32B2D" style={styles.icon} />
        <View>
          <Text style={styles.itemTitle}>Gerencie Informações</Text>
          <Text style={styles.itemText}>Escaneie o código de barras, e verifique todas as informações</Text>
        </View>
      </View>

      <View style={styles.item}>
        <Entypo name="shield" size={22} color="#D32B2D" style={styles.icon} />
        <View>
          <Text style={styles.itemTitle}>Aumente a Segurança Preventiva</Text>
          <Text style={styles.itemText}>Garanta descontos exclusivos na nossa plataforma e economize em cada compra</Text>
        </View>
      </View>

      <View style={styles.item}>
        <MaterialIcons name="assessment" size={24} color="#D32B2D" style={styles.icon} />
        <View>
          <Text style={styles.itemTitle}>Verifique índice</Text>
          <Text style={styles.itemText}>Últimas ocorrências, validade e outros recursos.</Text>
        </View>
      </View>

      {/* Testando com Pressable em vez de Link */}
      <Link href="/dashboard/page" asChild>
             <TouchableOpacity style={styles.button}>
               <Text style={styles.buttonText}>Explorar recursos</Text>
             </TouchableOpacity>
           </Link>
         </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32B2D',
    marginBottom: 20,
    textAlign: 'left',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 5,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  itemText: {
    fontSize: 14,
    color: '#555',
    maxWidth: '90%',
  },
  button: {
    backgroundColor: '#D32B2D',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
});
