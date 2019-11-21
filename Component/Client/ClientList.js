import React, {useState} from 'react';
import {StyleSheet, Alert, PermissionsAndroid, Platform} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Button,
  Right,
  View,
} from 'native-base';
import ClientBody from './ClientBody';
import BillModal from '../BillModal';
import EditBillModal from '../EditBillModal';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {generateBillPDF} from '../BillPDF';

//
const ClientList = ({client, index}) => {
  const objItems = client.items;
  const objArr = Object.entries(objItems);
  const items = objArr.map(([key, item]) => item);
  const newClient = {...client, items};
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  //
  const handleRemoveClient = () => {
    Alert.alert(
      'Delete Client',
      'Are you sure to delete',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            firebase
              .database()
              .ref(`clients/${newClient.id}`)
              .remove();
          },
        },
      ],
      {cancelable: false},
    );
  };

  // generate pdf
  //  pdf

  const createPDF = async pdf => {
    let options = {
      //Content to print
      html: pdf,
      //File Name
      fileName: `${client.id}`,
      //File directory
      directory: 'skv',
    };
    let file = await RNHTMLtoPDF.convert(options);
    Alert.alert(
      'Generate Bill PDF',
      `Path is : ${file.filePath}`,
      [
        {
          text: 'OK',
        },
      ],
      {cancelable: false},
    );
  };
  const handleGeneratePDF = async () => {
    let pdf = generateBillPDF(newClient);
    pdf = pdf.replace(/,/g, '');
    console.log('pfd', pdf);
    async function requestExternalWritePermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'CameraExample App External Storage Write Permission',
            message:
              'CameraExample App needs access to Storage data in your SD Card ',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //If WRITE_EXTERNAL_STORAGE Permission is granted
          //changing the state to show Create PDF option
          createPDF(pdf);
        } else {
          alert('WRITE_EXTERNAL_STORAGE permission denied');
        }
      } catch (err) {
        alert('Write permission err', err);
        console.warn(err);
      }
    }
    //Calling the External Write permission function
    if (Platform.OS === 'android') {
      requestExternalWritePermission();
    } else {
      createPDF(pdf);
    }
  };

  return (
    <>
      <View style={Styles.card}>
        <Card style={{marginBottom: '-7%'}}>
          {/* header */}
          <CardItem header bordered>
            <Left>
              <Body>
                <Text style={Styles.name}>{client.name}</Text>
                <Text note>{client.mobile}</Text>
              </Body>
            </Left>
            <Right>
              <View
                style={{
                  width: '35%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <Icon
                  name="edit"
                  size={20}
                  onPress={() => setOpenEditModal(true)}
                  style={{
                    marginRight: 20,
                  }}
                />
                <Icon name="remove" onPress={handleRemoveClient} size={20} />
              </View>
            </Right>
          </CardItem>

          {/* body */}
          <CardItem
            bordered
            style={{
              padding: 10,
              paddingLeft: 25,
            }}>
            <Body>
              <ClientBody
                clientId={newClient.id}
                bill={{
                  amount: client.grand,
                  paid: client.paid,
                  due: client.due,
                }}
              />
            </Body>
          </CardItem>

          {/* footer */}
          <CardItem footer>
            <Left>
              <Button transparent onPress={() => setOpenModal(true)}>
                <Text>View</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent onPress={handleGeneratePDF}>
                <Text>pdf</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      </View>

      <EditBillModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        client={newClient}
      />

      {/* view modal */}
      <BillModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        client={newClient}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  card: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  name: {
    letterSpacing: 1.5,
    fontSize: 20,
    color: '#00b386',
    textTransform: 'capitalize',
  },
});

export default ClientList;
