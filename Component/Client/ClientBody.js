import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import firebase from 'firebase';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Swipeout from 'rc-swipeout';
import {Text, View, Item, Input} from 'native-base';

const ClientBody = ({bill, clientId}) => {
  const [isEditPaid, setIsEditPaid] = useState(false);
  const [newpaid, setPaid] = useState('');

  const payment = () => {
    const objPayment = bill.paid.payment;
    const objArr = Object.entries(objPayment);
    const pymt = objArr.map(([key, item]) => item);
    return pymt;
  };

  const [allPayment, setAllPayment] = useState();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUpdatePaid = () => {
    const date = new Date();
    const donePayment = payment();
    console.log(payment);
    const paid = {
      amount: Number(bill.paid.amount) + Number(newpaid),
      payment: [
        ...donePayment,
        {
          amount: Number(newpaid),
          date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
        },
      ],
    };
    const due = Number(bill.due) - Number(newpaid);
    firebase
      .database()
      .ref(`clients/${clientId}`)
      .update({paid, due}, () => {
        setPaid('');
        setIsEditPaid(false);
      })
      .catch(err => console.log(err));
  };

  const handlePaymentDetails = () => {
    setAllPayment(payment());
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <View style={Styles.container}>
        <View style={Styles.row}>
          <Text>Amount</Text>
          <Text>{bill.amount}</Text>
        </View>
        <View>
          <Swipeout
            right={[
              {
                text: 'Add',
                onPress: () => {
                  setIsEditPaid(true);
                  setMenuOpen(false);
                },
                style: {
                  backgroundColor: 'green',
                  color: 'white',
                },
                className: 'custom-class-2',
              },
            ]}
            style={{
              backgroundColor: 'transparent',
            }}
            autoClose={true}>
            {isEditPaid ? (
              <Item success>
                <Input
                  placeholder="Enter Paid amount"
                  value={newpaid}
                  onChangeText={value => setPaid(value)}
                />
                <FontAwesomeIcon
                  name="save"
                  onPress={handleUpdatePaid}
                  style={{
                    fontSize: 20,
                    color: '#2e7d32',
                  }}
                />
              </Item>
            ) : (
              <View style={Styles.row}>
                <Text>Paid</Text>
                <Text>
                  {bill.paid.amount} {'   '}
                  <FontAwesomeIcon
                    name={menuOpen ? 'arrow-up' : 'arrow-down'}
                    onPress={handlePaymentDetails}
                    style={{
                      fontSize: 15,
                      color: '#2e7d32',
                    }}
                  />
                </Text>
              </View>
            )}
          </Swipeout>
          <View style={menuOpen ? Styles.menuOpen : Styles.menuClose}>
            <View style={Styles.menu}>
              <View style={Styles.row}>
                <Text>Date</Text>
                <Text>Amount</Text>
              </View>
              {allPayment &&
                allPayment.map((pay, index) =>
                  index > 0 ? (
                    <View key={index} style={Styles.row}>
                      <Text>{pay.date}</Text>
                      <Text>{pay.amount}</Text>
                    </View>
                  ) : (
                    allPayment.length === 1 && (
                      <Text style={{textAlign: 'center', paddingBottom: 10}}>
                        No Payment Done
                      </Text>
                    )
                  ),
                )}
            </View>
          </View>
        </View>
        <View style={Styles.row}>
          <Text>Due</Text>
          <Text style={bill.due !== 0 ? Styles.danger : Styles.success}>
            {bill.due}
          </Text>
        </View>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0f0',
  },
  container: {
    width: '97%',
  },
  menu: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#f4f4f4',
    paddingLeft: 20,
    paddingRight: 20,
  },
  menuClose: {
    display: 'none',
  },
  menuOpen: {
    display: 'flex',
  },
  danger: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
});

export default ClientBody;
