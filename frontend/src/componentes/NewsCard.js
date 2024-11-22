// src/components/NewsCard.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const NewsCard = ({ newsUrl, title, description, imageUrl }) => {
  const [image, setImage] = useState(imageUrl);

  useEffect(() => {
    // Caso o link da imagem seja inválido ou não exista, podemos definir uma imagem padrão
    if (!imageUrl) {
      setImage('https://via.placeholder.com/150'); // Imagem padrão
    }
  }, [imageUrl]);

  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <TouchableOpacity onPress={() => { 
          // Aqui você pode adicionar lógica para abrir o link da notícia
          // Por exemplo, usando o Linking do React Native
          console.log('Link para a notícia:', newsUrl);
        }}>
          <Text style={styles.link}>Leia mais...</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginVertical: 10,
    fontSize: 14,
    color: '#555',
  },
  link: {
    color: '#007BFF',
  },
});

export default NewsCard;
