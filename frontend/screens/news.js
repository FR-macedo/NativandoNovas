import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NewsCard from '../src/componentes/NewsCard';

const API_KEY = '2bd9aa80977d4d9d8124356454bf287e'; // Substitua pela sua chave da API News
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { label: 'Todos', value: null },
    { label: 'Negócios', value: 'business' },
    { label: 'Entretenimento', value: 'entertainment' },
    { label: 'Geral', value: 'general' },
    { label: 'Saúde', value: 'health' },
    { label: 'Ciência', value: 'science' },
    { label: 'Esporte', value: 'sports' },
    { label: 'Tecnologia', value: 'technology' },
  ];

  const fetchNews = async (category = null) => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          country: 'us',
          apiKey: API_KEY,
          category: category,
        },
      });
      setNewsData(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    fetchNews(category);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Filtros de categorias */}
      <ScrollView
        horizontal
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.value || 'all'}
            style={[
              styles.filterButton,
              selectedCategory === cat.value && styles.filterButtonActive,
            ]}
            onPress={() => handleCategoryPress(cat.value)}
          >
            <Text
              style={[
                styles.filterButtonText,
                selectedCategory === cat.value && styles.filterButtonTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Lista de notícias */}
      <View style={styles.cardListContainer}>
        <ScrollView>
          {newsData.map((news, index) => (
            <NewsCard
              key={index}
              title={news.title}
              description={news.description}
              imageUrl={news.urlToImage}
              newsUrl={news.url}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  filterScroll: {
    maxHeight: 80,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',  // Adicionando para permitir que os botões se ajustem
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10, // Adicionando espaçamento inferior
    minWidth: 100, // Garantir que os botões tenham uma largura mínima
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  filterButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  cardListContainer: {
    flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsList;

