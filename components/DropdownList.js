import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PressableButton from './PressableButton';

export default function DropdownList ({ options, onSelect, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  useEffect(()=>{
    setSelectedOption(options.filter(item=>item.value===value)[0])
  },[value])

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={toggleDropdown} style={{marginTop:20}}>
        <Entypo name={isOpen?"chevron-up":"chevron-down"} size={26} color="black" />
      </TouchableOpacity>
      {options&&isOpen &&
        <FlatList
          nestedScrollEnabled={true}
          style={styles.optionContainer}
          data={options}
          keyExtractor={item=>item.value}
          renderItem={({item})=>{
            return (
              <PressableButton customizedStyle={styles.optionItem} buttonPressed={() => handleOptionSelect(item)} >
                <Text>{item.label}    {selectedOption&&selectedOption.value===item.value&&<FontAwesome5 name="check" size={16} color="black" />}</Text>
              </PressableButton>
            )
          }}
        />
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    // position: 'absolute',
    // top:0,
    // bottom:0,
    // left:0,
    // right: 0,
    marginTop: 10,
    maxHeight: 200,
    width: 180,
    backgroundColor: '#fff', 
    borderRadius: 10, 
    zIndex: 15,
    elevation: (Platform.OS === 'android') ? 15 : 0,
  },
  optionItem: {
    borderBottomColor: 'rgb(200,200,200)',
    borderBottomWidth: 1,
    paddingVertical: 15, 
  },
})
