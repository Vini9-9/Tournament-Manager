import { Modality } from '@/types';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Linking, TouchableHighlight } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import api from '@/services/api';
import moment from 'moment';

interface HeaderModalityProps {
    onOptionChange: (value: string) => void;
}

const HeaderModality: React.FC<HeaderModalityProps>  = ({ onOptionChange }) => {
    const [options, setOptions] = useState<Modality[]>([]);
    const [boletimDate, setBoletimDate] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

    const fetchData = async () => {
        const modalitiesData = await api.getModalities();
        const info = await api.getInfo();
        setOptions(modalitiesData);
        const date_fmt = moment(info.boletimDate, 'DD/MM/YYYY').format('DD/MM')
        setBoletimDate(date_fmt);
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
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Selecione uma modalidade: </Text>
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
                    <TouchableHighlight  onPress={openLinkBoletim} underlayColor="transparent">
                        <Text style={styles.subtitle}>Dados retirados do Boletim NDU {boletimDate != '' && `(${boletimDate})`}</Text>
                    </TouchableHighlight>
                </View>
                }
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
    separator: {
        height: 1,
        width: '80%',
        backgroundColor: 'black',
        marginTop: 10
      },
    container: {
        backgroundColor: '#f2f2f2',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
    },
    text: {
        alignSelf: 'center',
        fontSize: 15,
        marginTop: 10
    },
    subtitleContainer: {
        alignItems: 'center',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#7030A0',
    },
    subtitle: {
        fontSize: 12,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});

export default HeaderModality;