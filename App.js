/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/jsx-no-undef */
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList, TextInput} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  
  const [filteredData, setfilteredData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getPostsData();
  }, []);

  const getPostsData = async () => {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts',
    );
    if (response.status === 200) {
      setData(response.data);
      setfilteredData(response.data);
    }
    if (response.status === 404) {
      console.log('Not Found');
    }
  };

  const ItemView = ({item}) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {'. '}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const searchFilter = text => {
    if(text) {
      const newData = data.filter(item => {
      return item.title.toLowerCase().includes(text.toLowerCase());
      });   
      setfilteredData(newData);
      setSearch(text);
    }else {
      setfilteredData(data);
      setSearch(text);
    }
  }

  return (
    <SafeAreaView >
      <View>
        <TextInput 
        style={styles.textInputStyle} 
        placeholder="Search"
        underlineColorAndroid={'transparent'}
        value={search}
        onChangeText={searchFilter}
        />
        <FlatList
          data={filteredData }
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                backgroundColor: '#c8c8c8',
              }}
            />
          )}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  itemStyle: {
    padding: 15,
  },
  textInputStyle: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#fff',
  },
});

export default App;
