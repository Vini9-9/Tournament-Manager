import { Team } from '@/types';
import React from 'react';
import { View, ScrollView, FlatList, Text, StyleSheet } from 'react-native';
import { stylesComponent } from './styles';

const Table: React.FC<any> = ({ ranking, index, numberToQualify }) => {

    console.log('ranking', ranking)

    const renderItem = (time: Team, index: number) => {
        let itemStyle: any = stylesComponent.item;
        // if (index < numberToQualify) { // Altere x para o número de linhas que deseja destacar
        //     itemStyle = [stylesComponent.item, stylesComponent.primeirasLinhasBackground];
        // }
        // console.log(time, index)
        return (
            <View style={styles.row}>
                <Text style={[styles.cell, { width: 45 }]}>{index+1}º</Text>
                <Text style={[styles.cell, { width: 200 }]}>{time.Time}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.Pontos}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.Jogos}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.V}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.E}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.D}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.Gols_Pro}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.Gols_Contra}</Text>
                <Text style={[styles.cell, { width: 50 }]}>{time.Saldo}</Text>
            </View>
        )
    }

    return (
    <View style={styles.container}>
        <ScrollView horizontal>
            <View style={styles.listContainer}>
                <View style={styles.header}>
                    <Text style={[styles.headerText, { width: 45 }]}> Col. </Text>
                    <Text style={[styles.headerText, { width: 200 }]}> Grupo </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> P </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> J </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> V </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> E </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> D </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> GP </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> GC </Text>
                    <Text style={[styles.headerText, { width: 50 }]}> S </Text>
                </View>
                <FlatList
                    data={ranking}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => item.ID}
                />
            </View>
        </ScrollView>
    </View>
    )
}

export default Table;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    listContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e1e1e1"
    },
    headerText: {
        // fontFamily: FontFamily.poppins.
        fontSize: 15,
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginVertical: 8,
        marginHorizontal: 1,
        elevation: 1,
        borderRadius: 3,
        paddingVertical: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 6,
    },
    cell:{
        // tontFamily: Fontramily.poppinsredular,
        color: 'black',
        fontSize: 14,
        flex: 1
    }

})


