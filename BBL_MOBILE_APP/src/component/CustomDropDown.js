import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomInputHeader from './CustomInputHeader';
import {Colors} from '../util/Base';
import {Dropdown} from 'react-native-element-dropdown';

export default function CustomDropDown({
  name,
  value,
  setValue,
  errMessage,
  items = [],
  style = {},
  required = true,
}) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[style, {flex: 1}]}>
      <CustomInputHeader
        name={name}
        required={required}
        errMessage={errMessage}
      />
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        itemTextStyle={{ color: "black" }}
        data={items}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Seçiniz' : '...'}
        searchPlaceholder="Ara..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 8,

    backgroundColor: 'white',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Colors.Gray
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black"
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: "black"
  },
});
