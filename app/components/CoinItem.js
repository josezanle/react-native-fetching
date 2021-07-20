import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const CoinItem = ({coin}) => (
  <View style={styles.containerItem}>
    <View style={styles.coinName}>
      <Image source={{uri: coin.image}} style={styles.image} />
      <View style={styles.containerNames}>
        <Text style={styles.text}>{coin.name}</Text>
        <Text style={styles.textSymbol}>{coin.symbol}</Text>
      </View>
    </View>

    <View style={styles.right}>
      <Text style={styles.textPrice}>${coin.current_price}</Text>
      <Text
        style={[
          styles.pricePercentage,
          coin.price_change_percentage_24h > 0
            ? styles.priceUp
            : styles.priceDown,
        ]}>
        {coin.price_change_percentage_24h.toFixed(2)}%
      </Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: '#455497',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  containerNames: {
    marginLeft: 10,
  },
  coinName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  textPrice: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pricePercentage: {
    textAlign: 'right',
  },
  priceUp: {
    color: '#54efda',
  },
  priceDown: {
    color: '#d54889',
  },

  textSymbol: {
    color: '#e2a058',
    textTransform: 'uppercase',
  },
});

export default CoinItem;
