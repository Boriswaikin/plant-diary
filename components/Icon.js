import { View, Text ,StyleSheet, Image} from 'react-native'
import React from 'react'

const Icon = (props)=> {
  return (
    <View
      style={styles(props).body}
    >
    <Image
        style={{ 
            width: props.width,
            height: props.height,
            borderRadius:  props.borderRadius,}}
        source={{uri:props.source}}
        ></Image>
    </View>
  )
}

const styles = (props) =>
  StyleSheet.create({
    body: { 
      width: props.width,
      height: props.height,
      borderRadius:  props.borderRadius,
      justifyContent: props.justifyContent,
      alignItems: props.alignItems,
    },
  });

export default Icon;