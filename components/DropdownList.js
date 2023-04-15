import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function DropdownList ({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={toggleDropdown} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 5 }}>{selectedOption ? selectedOption.label : 'Select an option'}</Text>
        <Icon name={isOpen ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={20} color="#999" />
      </TouchableOpacity>
      {isOpen && (
        <View style={{ position: 'absolute', top: '100%', width: '100%', backgroundColor: '#fff', borderRadius: 4, elevation: 4 }}>
          {options.map((option) => (
            <TouchableOpacity key={option.value} onPress={() => handleOptionSelect(option)} style={{ padding: 10 }}>
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};
