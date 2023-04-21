import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PressableButton from './PressableButton';
import {readAsStringAsync} from 'expo-file-system';

const API_KEY = 'p7amMGJ1HIB0c7gVw9QcDLcP8Dv9JvT7q0249zg2xbeTqZknct';

export default function APIManager({ uri, setLoading, setOutput }) {
  const [result, setResult] = useState(null);

  async function identifyPlant (uri) {
    try {
      setLoading(true);
      const base64 = await readAsStringAsync(uri,{ encoding: 'base64' });
      const data = {
        api_key: API_KEY,
        images: [base64],
        modifiers: ['crops_fast', 'similar_images'],
        plant_language: 'en',
        plant_details: ["common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"],
      }

      const response = await fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const output = await response.json();
      setResult(output.suggestions[0]);
      setOutput(output.suggestions[0].plant_name);
      setLoading(!output);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <View style={styles.buttonContainer}>
      <PressableButton customizedStyle={styles.editButton} buttonPressed={()=>identifyPlant(uri)} >
        <Text style={styles.editText}>Identify Me!</Text>
      </PressableButton>
      </View>
      {result && (
        <>
          <Text style={styles.title}>Result: {result.plant_name}</Text>
          {result.plant_details&&result.plant_details.wiki_description&&<Text numberOfLines={5}>{result.plant_details.wiki_description.value}</Text>}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 3,
  },
  buttonContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 10,
  },
  editButton: {
    borderRadius: 5,
    padding: 2,
    margin: 5,
    width: 85,
    height: 22,
    backgroundColor: 'rgb(220,220,220)',
  },
  editText: {
    fontSize: 11,
    color: 'black',
    fontWeight: 600,
  },
})
