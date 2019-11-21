import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import firebase from 'firebase';
import {View, Item, Picker, Icon, Input} from 'native-base';

const ItemFiled = ({index, FontAwesomeIcon, iconStyle, addItem}) => {
  let SelectItemDB = useSelector(state =>
    Object.entries(state.SelectItems).map(([key, value]) => value),
  );
  // state here
  const [items, setItems] = useState({
    item: '-1',
    rate: '',
    area: '',
    total: '',
  });

  const [selectItems, setSelectItems] = useState(SelectItemDB);

  const [addNewItem, setAddNewItem] = useState(false);
  const [newItem, setNewItem] = useState('');

  //
  const handleSelect = value => {
    setItems({...items, item: value});
    if (value === 'addnewitem') {
      setAddNewItem(true);
    }
  };

  //
  const handleNewItem = () => {
    if (SelectItemDB.indexOf(newItem) !== -1) {
      firebase
        .database()
        .ref(`items/${selectItems.length}`)
        .set(newItem, () => {
          setItems({
            ...items,
            item: newItem,
          });
          setAddNewItem(false);
        });
    } else {
      setItems({
        ...items,
        item: newItem,
      });
      setAddNewItem(false);
    }
  };

  useEffect(() => {
    addItem(items, index);
  }, [items, index, addItem]);

  return (
    <>
      <View style={{marginBottom: 20}}>
        {addNewItem ? (
          <Item success>
            <Input
              placeholder="New Item"
              value={newItem}
              onBlur={handleNewItem}
              onChangeText={value => {
                setNewItem(value);
                setItems({...items, item: value});
              }}
            />
            <FontAwesomeIcon
              name="plus-square"
              onPress={handleNewItem}
              style={iconStyle}
            />
          </Item>
        ) : (
          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon style={iconStyle} name="arrow-down" />}
              style={{width: undefined}}
              placeholder="Select item"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              selectedValue={items.item}
              onValueChange={value => handleSelect(value)}>
              {newItem.length ? (
                <Picker.Item
                  label={newItem.toUpperCase()}
                  value={newItem.toUpperCase()}
                />
              ) : (
                <Picker.Item label="Select item" value="-1" />
              )}

              {selectItems.sort().map((i, inx) => (
                <Picker.Item
                  key={inx}
                  label={i.toUpperCase()}
                  value={i.toUpperCase()}
                />
              ))}
              <Picker.Item label="Add New Item" value="addnewitem" />
            </Picker>
          </Item>
        )}

        {/* rate */}
        <View style={Styles.row}>
          <Item success style={{width: '32%'}}>
            <Input
              keyboardType="number-pad"
              placeholder="Rate"
              value={items.rate}
              onChangeText={value =>
                setItems({
                  ...items,
                  rate: value,
                  total: Number(value) * Number(items.area),
                })
              }
            />
            <FontAwesomeIcon name="rupee" style={iconStyle} />
          </Item>

          <Item success style={{width: '32%'}}>
            <Input
              placeholder="Area"
              keyboardType="number-pad"
              value={items.area}
              onChangeText={value =>
                setItems({
                  ...items,
                  area: value,
                  total: Number(value) * Number(items.rate),
                })
              }
            />
            <FontAwesomeIcon name="area-chart" style={iconStyle} />
          </Item>

          <Item success style={{width: '32%'}}>
            <Input
              disabled
              value={
                items.area.length && items.rate.length
                  ? String(items.total)
                  : 'Total'
              }
            />
            <Icon name="calculator" />
          </Item>
        </View>
      </View>
    </>
  );
};

// style here
const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ItemFiled;
