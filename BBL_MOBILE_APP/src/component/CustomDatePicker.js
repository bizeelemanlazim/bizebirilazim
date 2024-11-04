import {View, TextInput, Platform} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../util/Base'
import CustomInputHeader from './CustomInputHeader';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function CustomDatePicker({
  name,
  placeholder,
  text,
  setText,
  errMessage,
  style = {},
  required = true,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setText(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
    hideDatePicker();
  };

  return (
    <View style={style}>
      <CustomInputHeader
        name={name}
        required={required}
        errMessage={errMessage}
      />
      <TextInput
        editable={false}
        onPressIn={showDatePicker}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={Colors.Gray}
        style={{
          top: 10,
          backgroundColor: 'white',
          fontSize: 20,
          padding: 10,
          borderRadius: 10,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
        }}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
