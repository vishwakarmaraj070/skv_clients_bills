import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {Text, Form, Item, Input, View, Button} from 'native-base';
import ItemFiled from './ItemField';
import BillModal from '../BillModal';
import {setActiveTab} from '../Redux/ActiveTab/ActiveTabAction';
import firebase from 'firebase';
// items
let items = [];

const Create = () => {
  // redux setup
  const dispatch = useDispatch();
  const [clientDetails, setClientDetails] = useState({
    name: '',
    mobile: '',
  });
  const [client, setClient] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const [fieldCount, setFieldCount] = useState([1]);

  // add more
  const handleAddMore = () => {
    setFieldCount([...fieldCount, fieldCount.length]);
  };

  // view bill
  const handlerView = () => {
    // grand
    if (clientDetails.name.length > 2) {
      if (clientDetails.mobile.length === 10) {
        if (items.length) {
          const TotalArr = items.map(item => Number(item.total));
          const grand = TotalArr.reduce((prev, current) => prev + current);
          const date = new Date();
          setClient({
            id: `${clientDetails.name}${clientDetails.mobile}`,
            name: clientDetails.name,
            mobile: clientDetails.mobile,
            date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
            items,
            grand,
            paid: {
              payment: [
                {
                  amount: 0,
                  date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
                },
              ],
              amount: 0,
            },
            due: grand,
          });
          // open modal
          setOpenModal(true);
        } else {
          alert('Add Item First');
        }
      } else {
        alert('Incorrect Mobile Number');
      }
    } else {
      alert('Invalid Client Name');
    }
  };

  //save client
  const handleSave = () => {
    firebase
      .database()
      .ref(`clients/${client.id}`)
      .set(client, () => {
        setFieldCount([]);
        setOpenModal(false);
        setClientDetails({name: '', mobile: ''});
        dispatch(setActiveTab(0));
        items = [];
      })
      .catch(err => console.log(err));
  };

  // add item
  const addItem = (newItem, index) => {
    if (newItem.total > 0 && newItem.item !== '-1') {
      items.splice(index, 1, newItem);
    } else {
      items.splice(index, 1);
    }
  };
  return (
    <>
      <View style={Styles.padder}>
        <Form>
          {/* name */}
          {/* <H3 style={Styles.title}>Client Details</H3> */}
          <View style={{marginLeft: 0}}>
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
                onChangeText={value => {
                  if (!isNaN(value)) {
                    setClientDetails({
                      ...clientDetails,
                      mobile: value,
                    });
                  }
                }}
              />
              <FontAwesomeIcon style={Styles.iconStyle} name="phone" />
            </Item>
          </View>
          {/* select item */}
          <View style={{marginTop: 20}}>
            {fieldCount.map((n, index) => (
              <ItemFiled
                key={index}
                index={index}
                addItem={addItem}
                iconStyle={Styles.iconStyle}
                FontAwesomeIcon={FontAwesomeIcon}
              />
            ))}
          </View>

          {/* button */}
          <View style={Styles.button}>
            <Button success onPress={handlerView}>
              <Text>View Bill</Text>
            </Button>

            <Button onPress={handleAddMore} style={{marginLeft: 10}}>
              <Text>Add More</Text>
            </Button>
          </View>
        </Form>

        <BillModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          client={client}
          isCreate={true}
          handleSave={handleSave}
        />
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
    justifyContent: 'flex-end',
  },
  iconStyle: {
    fontSize: 20,
    color: '#2e7d32',
  },
});

export default Create;
