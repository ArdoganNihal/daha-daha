import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const DahaComponent = () => {
    return (
        <View style={styles.logoContainer}>
            {/* DAHA yazısı için her harfin bloğu */}
            {['D', 'A', 'H', 'A'].map((letter, index) => (
                <View key={letter + index} style={styles.letterBlock}>
                    {/* Üst blok */}
                    <View style={[styles.block, styles[`color${index}Top`]]}>
                        <Text style={styles.text}>{letter}</Text>
                    </View>
                    {/* Alt blok */}
                    <View style={[styles.block, styles[`color${index}Bottom`]]}><Text style={styles.text}>{letter}</Text></View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    logoContainer: {
        flexDirection: 'row',
        height: 35, // Logo yüksekliği
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', // Arka plan rengi
    },
    letterBlock: {
        width: 20, // Her harf bloğunun genişliği
        height: 35, // Her harf bloğunun yüksekliği
        margin: 2, // Harfler arası boşluk
    },
    block: {
        width: '100%',
        height: '50%',
        justifyContent: 'center', // Metni blokta dikey olarak ortala
        alignItems: 'center', // Metni blokta yatay olarak ortala
    },
    text: {
        fontSize: 15, // Font boyutu
        color: 'black', // Font rengi
        fontWeight: 'bold', // Font kalınlığı
    },
    color0Top: {
        backgroundColor: '#F40000', // D harfi için üst blok rengi
    },
    color0Bottom: {
        backgroundColor: '#009639', // D harfi için alt blok rengi
    },
    color1Top: {
        backgroundColor: '#F1DE02', // A harfi için üst blok rengi
    },
    color1Bottom: {
        backgroundColor: '#F40000', // A harfi için alt blok rengi
    },
    color2Top: {
        backgroundColor: '#009639', // H harfi için üst blok rengi
    },
    color2Bottom: {
        backgroundColor: '#FF8300', // H harfi için alt blok rengi
    },
    color3Top: {
        backgroundColor: '#F1DE02', // A harfi için üst blok rengi
    },
    color3Bottom: {
        backgroundColor: '#009639', // A harfi için alt blok rengi
    },
});

export default DahaComponent;
