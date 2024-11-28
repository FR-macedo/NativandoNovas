import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsCard from '../src/componentes/NewsCard'; // Certifique-se de que NewsCard esteja correto
import { useNavigation } from '@react-navigation/native'; // Adicionado para navegação

const FavoriteNews = () => {
  const [favorites, setFavorites] = useState([]); // Armazena as notícias favoritas
  const [loading, setLoading] = useState(true); // Controle de estado de carregamento
  const navigation = useNavigation(); // Hook para controle de navegação

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');

        if (token) {
          const response = await axios.get('http://localhost:5000/api/favorites/favorites', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFavorites(response.data); // Atualiza o estado com as notícias favoritas
        } else {
          console.error('Token não encontrado!');
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noFavoritesText}>Você ainda não tem notícias favoritas.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {favorites.map((fav) => (
        <NewsCard
          key={fav.id}
          title={fav.title}
          description={fav.description}
          imageUrl={fav.urlToImage }
          newsUrl={fav.url}
          isFavorite={true}
          onPress={() =>
            navigation.navigate('NewsDetails', {
            
              title: fav.title,
              description: fav.description,
              imageUrl: fav.urlToImage,
              newsUrl: fav.url,
            })
          }
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default FavoriteNews;
