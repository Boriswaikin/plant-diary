import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const API_KEY = 'YOUR_API_KEY_HERE';

export default function APIManager({ uri }) {
  const [result, setResult] = useState(null);

  async function identifyPlant (uri) {
    const formData = new FormData();
    formData.append('organs', 'flower,leaf');
    formData.append('images', { uri, name: 'image.jpg', type: 'image/jpg' });

    try {
      const response = await fetch('https://api.plant.id/v2/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Api-Key': API_KEY,
        },
        body: formData,
      });

      const data = await response.json();
      setResult(data);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Identify the plant" onPress={()=>identifyPlant(uri)} />
      {result && (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 10 }}>Identification result:</Text>
          <Text>{result.suggestions[0].plant_name}</Text>
          <Text>{result.suggestions[0].probability}</Text>
        </>
      )}
    </View>
  );
};
