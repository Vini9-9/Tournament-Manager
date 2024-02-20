import { Modality } from '@/types';
import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

interface HeaderModalityProps {
    options: Modality[]; // Lista de opções no formato { label: "modality - series", value: "modality - series" }
    onOptionChange: (value: string) => void;
}

const HeaderModality: React.FC<HeaderModalityProps>  = ({ options, onOptionChange }) => {
    // const [selectedOption, setSelectedOption] = useState<string>(options[0].value);

    return (
        <View style={styles.container}>
            <RNPickerSelect
                placeholder={{ label: 'Selecione uma opção', value: null }}
                items={options}
                onValueChange={value => onOptionChange(value)}
                style={pickerSelectStyles}
            />
        </View>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HeaderModality;
