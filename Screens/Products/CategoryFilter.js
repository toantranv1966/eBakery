import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ListItem, Badge, Text, View } from 'native-base';

const CategoryFilter = (props) => {
  const data = props.categories;
  console.log('Categories', data);
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: '#f2f2f2' }}
    >
      <View
        style={{ margin: 0, padding: 0, borderRadius: 0, flexDirection: 'row' }}
      >
        <TouchableOpacity
          key={1}
          onPress={() => {
            props.categoryFilter('all'), props.setActive(-1);
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == -1 ? styles.active : styles.inactive,
            ]}
          >
            <Text style={{ color: 'white' }}>All</Text>
          </Badge>
        </TouchableOpacity>
        {props.categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              props.categoryFilter(item.id),
                props.setActive(props.categories.indexOf(item));
            }}
          >
            <Badge
              style={[
                styles.center,
                { margin: 5, borderRadius: 50 },
                props.active == props.categories.indexOf(item)
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              <Text style={{ color: 'white' }}>{item.name}</Text>
            </Badge>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#ffce00',
  },
  inactive: {
    backgroundColor: 'gray',
  },
});

export default CategoryFilter;
