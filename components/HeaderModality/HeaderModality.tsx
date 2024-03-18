import { Modality } from '@/types';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import api from '@/services/api';

interface HeaderModalityProps {
    // options: Modality[]; // Lista de opções no formato { label: "modality - series", value: "modality - series" }
    onOptionChange: (value: string) => void;
}


const HeaderModality: React.FC<HeaderModalityProps>  = ({ onOptionChange }) => {
    const [options, setOptions] = useState<Modality[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const fetchData = async () => {
        const modalitiesData = await api.getModalities();
        setOptions(modalitiesData);
    };
    
    const openLinkBoletim = () => {
        const URL = 'https://www.ndu.net.br/boletim';
        Linking.openURL(URL);
      };
      
    useEffect(() => {
        fetchData();
    }, []);

    const getLabelByValue = (value: string | null) => {
        if (!value) return null;
        const option = options.find((option) => option.value === value);
        return option ? option.label : null;
        };

    return (
        <>
        <View style={styles.container}>
            <Text>Selecione uma modalidade: </Text>
            <RNPickerSelect
                useNativeAndroidPickerStyle
                placeholder={{ label: 'Selecione uma opção', value: null }}
                items={options}
                onValueChange={value => {
                    setSelectedOption(value);
                    setSelectedLabel(getLabelByValue(value));
                    onOptionChange(value)
                }}
                style={pickerSelectStyles}
                
            />
            {selectedOption && 
             <View style={styles.subtitleContainer}>
                <Text style={styles.title}>{selectedLabel}</Text>
                <TouchableOpacity onPress={openLinkBoletim}>
                    <Text style={styles.subtitle}>Dados retirados do Boletim NDU</Text>
                </TouchableOpacity>
              </View>
            }
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </>
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
    separator: {
        // marginVertical: 5,
        height: 1,
        width: '80%',
        backgroundColor: 'black',
        marginTop: 10
      },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    subtitleContainer: {
        alignItems: 'center',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
    },
});

export default HeaderModality;
