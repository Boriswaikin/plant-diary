import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import PressableButton from './PressableButton';

export default function DropdownList ({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleDropdown}>
        <Entypo name={isOpen?"chevron-up":"chevron-down"} size={26} color="black" />
      </TouchableOpacity>
      {options&&isOpen &&
        <FlatList
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
        />}
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    maxHeight: 300,
    width: 300,
    position: 'absolute', 
    top: 50, 
    left: 0,
    backgroundColor: '#fff', 
    borderRadius: 10, 
  },
  optionItem: {
    borderBottomColor: 'rgb(200,200,200)',
    borderBottomWidth: 1,
    paddingVertical: 15, 
  }
})
