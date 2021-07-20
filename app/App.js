import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  StatusBar,
} from 'react-native';

import CoinItem from './components/CoinItem';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
    );

    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Market</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search a coin"
          placeholderTextColor="#858585"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        // data mapeara el state
        data={coins.filter(
          coin =>
            coin.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
            coin.symbol
              .toLocaleLowerCase()
              .includes(search.toLocaleLowerCase()),
        )}
        renderItem={({item}) => {
          return <CoinItem coin={item} />;
        }}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await loadData();
          setRefreshing(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a3158',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  searchInput: {
    color: 'white',
    borderBottomColor: '#4657ce',
    borderBottomWidth: 1,
    width: '40%',
    textAlign: 'center',
  },
});

export default App;
