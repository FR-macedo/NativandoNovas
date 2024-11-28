import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button, Linking } from 'react-native';

const NewsDetails = ({ route, navigation }) => {
  const { title, description, imageUrl, newsUrl } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: imageUrl || 'https://via.placeholder.com/300' }}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button
        title="Leia a notícia completa"
        onPress={() => Linking.openURL(newsUrl)} // Abre o link no navegador
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    color: '#555',
  },
});

export default NewsDetails;
