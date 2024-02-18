import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { API_URL } from '../constants/constants'; // Replace with your actual API URL
import HTML from 'react-native-render-html';
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const CampaignDetail = ({ route, navigation }) => {
  const [promotionDetail, setPromotionsDetail] = useState([]);
  // Promosyon detayları için state ve fetch fonksiyonları...
  const { SeoName, Id } = route.params;

  const fetchPromotionsDetail = async () => {
    const response = await fetch(`${API_URL}/promotions?Id=${Id}`, {
      headers: {
        'X-Country-Id': 'TR',
        'X-Language-Id': 'TR', // notice the Bearer before your token
      },
    });
    const data = await response.json();
    setPromotionsDetail(data);
  };

  const handleBack = () => {
    navigation.goBack()

  }
  useEffect(() => {
    fetchPromotionsDetail();
    // return () => setPromotionsDetail(null);
  }, [Id]);
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: promotionDetail?.ImageUrl }}
        style={styles.image}
      />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => handleBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

        </View>
          <Image
            source={{ uri: promotionDetail?.BrandIconUrl }}
            style={styles.brandIcon}
          />
        <View style={styles.content}>
          <HTML source={{ html: promotionDetail?.Title }} contentWidth={width} />
          <HTML source={{ html: promotionDetail?.Description }} contentWidth={width} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{promotionDetail?.DetailButtonText}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 48, // iPhone X için durum çubuğu boşluğu
    zIndex: 10, 
  },
  brandIcon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  backButton: {
    marginLeft: 10,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: "black"
    // Header başlığı stilini burada ayarlayabilirsiniz
  },
  image: {
    width: '100%',
    height: 300, // veya aspect ratio'nunuza göre ayarlayın
    position: 'absolute',
    top: 0,
  },
  content: {
    padding: 20, // İçerik kısmının dış boşlukları
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E53935', // Buton arkaplan rengi
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ...Diğer stil tanımlamalarınız
})
export default CampaignDetail