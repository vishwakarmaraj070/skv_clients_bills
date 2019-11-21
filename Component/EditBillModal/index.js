import React, {useState, useEffect} from 'react';
import {StyleSheet, Modal, ScrollView} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Text, Form, Item, Input, View, Button} from 'native-base';
import EditItemField from './EditItemField';
import firebase from 'firebase';

// items
let items = [];

const EditBillModal = ({openEditModal, setOpenEditModal, client}) => {
  // const clients
  const [clientDetails, setClientDetails] = useState({});
  const [fieldCount, setFieldCount] = useState([]);

  // add more
  const handleAddMore = () => {
    setFieldCount([...fieldCount, fieldCount.length]);
  };

  useEffect(() => {
    setClientDetails(client);
    setFieldCount(client.items.map((i, ind) => ind));
    items = client.items;
  }, [client]);

  const handleReqClose = () => {
    setOpenEditModal(false);
    setFieldCount(client.items.map((i, ind) => ind));
  };

  //save client
  const handleSave = () => {
    setClientDetails({...clientDetails, items: items});
    const TotalArr = items.map(item => Number(item.total));
    const grand = TotalArr.reduce((prev, current) => prev + current);
    const date = new Date();
    const newclient = {
      id: clientDetails.id,
      name: clientDetails.name,
      mobile: clientDetails.mobile,
      date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
      items: items,
      grand: grand,
      paid: clientDetails.paid,
      due: Number(grand) - Number(clientDetails.paid.amount),
    };
    firebase
      .database()
      .ref(`clients/${clientDetails.id}`)
      .update(newclient, () => handleReqClose());
  };

  // add item
  const addItem = (newItem, ind) => {
    if (newItem.total > 0 && newItem.item !== '-1') {
      items.splice(ind, 1, newItem);
    } else {
      items.splice(ind, 1);
    }
  };

  return (
    <>
      <View
        style={{
          marginTop: 22,
        }}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={openEditModal}
          onRequestClose={handleReqClose}>
          <ScrollView style={Styles.container}>
            <View style={Styles.padder}>
              <Form>
                {/* name */}
                {/* <H3 style={Styles.title}>Client Details</H3> */}
                <View
                  style={{
                    marginLeft: 0,
                  }}>
                  <Item success>
                    <Input
                      placeholder="Client Name"
                      value={clientDetails.name}
                      onChangeText={value =>
                        setClientDetails({
                          ...clientDetails,
                          name: value,
                        })
                      }
                    />
                    <FontAwesomeIcon name="user" style={Styles.iconStyle} />
                  </Item>

                  {/* mobile */}
                  <Item success>
                    <Input
                      keyboardType="number-pad"
                      placeholder="Mobile no"
                      value={clientDetails.mobile}
                      maxLength={10}
                      onChangeText={value =>
                        setClientDetails({
                          ...clientDetails,
                          mobile: value,
                        })
                      }
                    />
                    <FontAwesomeIcon style={Styles.iconStyle} name="phone" />
                  </Item>
                </View>
                {/* select item */}
                <View
                  style={{
                    marginTop: 20,
                  }}>
                  {fieldCount.map((n, index) => (
                    <EditItemField
                      key={index}
                      index={index}
                      item={
                        fieldCount.length <= client.items.length
                          ? client.items[index]
                          : {item: '-1', rate: '', area: '', total: ''}
                      }
                      addItem={addItem}
                      iconStyle={Styles.iconStyle}
                      FontAwesomeIcon={FontAwesomeIcon}
                    />
                  ))}
                </View>

                {/* button */}
                <View style={Styles.button}>
                  <Button success onPress={handleSave}>
                    <Text>Save</Text>
                  </Button>

                  <Button onPress={handleAddMore}>
                    <Text>Add More</Text>
                  </Button>

                  <Button warning onPress={handleReqClose}>
                    <Text>Close</Text>
                  </Button>
                </View>
              </Form>
            </View>
          </ScrollView>
        </Modal>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  padder: {
    padding: 10,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-around',
  },
  iconStyle: {
    fontSize: 20,
    color: '#2e7d32',
  },
});
export default EditBillModal;
