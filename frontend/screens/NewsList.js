// src/screens/NewsList.js
import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import NewsCard from '../src/componentes/NewsCard';

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Substitua pela URL da sua API de notícias
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us', // País para as notícias
            apiKey: '2bd9aa80977d4d9d8124356454bf287e', // Sua chave da API News
          },
        });
        setNewsData(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewsList;
