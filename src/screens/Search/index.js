import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { getMovieList } from '../../api/movie';
import { Header, Input, MovieCard } from '../../components';
import { COLORS } from '../../theme';
import styles from './styles';

export const SearchScreen = () => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const onPressSearch = async () => {
    const _data = await getMovieList({ searchValue: value, page });
    setData(_data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onPressSearch();
    }, 600);
    return () => clearTimeout(timer);
  }, [value]);




  useEffect(() => {

      getMovieList({ searchValue: value, page }).then(res => {
        setData([...data,...res]);
      }).catch(err => {
        console.log(err);
      });

  }, [page]);


  const renderItem = ({ item }) => {
    return (
      <MovieCard
        title={item.Title}
        releaseDate={item.Year}
        imageUrl={item.Poster}
      />
    );
  };

  const renderLoader = () => {
    if(data.length != 0) {
      
      return (
        <View style={styles.loaderContainer}>
          <Text size="large" color="#aaa">
            Loading...
          </Text>
        </View>
      );
    }else {
      return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Input
              value={value}
              onChangeText={(e) => setValue(e)}
              right={
                <Pressable
                  style={styles.searchIconContainer}
                  onPress={onPressSearch}>
                  <Icon
                    name="magnifying-glass"
                    size={30}
                    color={COLORS.sun}
                    style={styles.icon}
                  />
                </Pressable>
              }
            />
            <Header text={'Search Result'} />
          </>
        }
        ListFooterComponent={renderLoader}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};
