import React from 'react';
import {Modal, StyleSheet, ScrollView} from 'react-native';
import {H3, Button, Text, View} from 'native-base';
const BillModal = ({
  openModal,
  setOpenModal,
  client,
  handleSave,
  isCreate = false,
}) => {
  return (
    <>
      <View style={{marginTop: 22}}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={openModal}
          onRequestClose={() => setOpenModal(false)}>
          <ScrollView style={Styles.container}>
            <View style={{marginBottom: '12%'}}>
              {/* owner */}
              <View style={Styles.row}>
                <View style={{width: '60%'}}>
                  <H3 style={Styles.h3Color}>Skv</H3>
                  <Text>9793939227</Text>
                  <Text>Karve Nagar, Pune</Text>
                </View>
                <View style={{width: '40%'}}>
                  <View style={Styles.lastRow}>
                    <Text>Date : </Text>
                    <Text
                      style={{
                        marginLeft: 10,
                      }}>
                      {client.date}
                    </Text>
                  </View>
                </View>
              </View>

              {/* client */}
              <View style={Styles.row}>
                <View>
                  <Text>{''}</Text>
                </View>
                <View>
                  <Text>Bill To</Text>
                  <H3 style={Styles.h3Color}>{client.name}</H3>
                  <Text>{client.mobile}</Text>
                </View>
              </View>

              {/* item */}
              <View style={{marginBottom: 10}}>
                <H3 style={{textAlign: 'center', color: '#1976d2'}}>
                  Items Discription
                </H3>
              </View>

              {/* bill items */}
              <View style={{borderTopWidth: 2, borderTopColor: '#f4f4f4'}}>
                <View style={Styles.tRow}>
                  <View style={{width: '50%'}}>
                    <Text>Item Discription</Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <View style={Styles.lastRow}>
                      <View style={{width: '30%'}}>
                        <Text style={{textAlign: 'right'}}>Rate</Text>
                      </View>
                      <View style={{width: '30%'}}>
                        <Text style={{textAlign: 'right'}}>Area</Text>
                      </View>
                      <View style={{width: '40%'}}>
                        <Text style={{textAlign: 'right'}}>Total</Text>
                      </View>
                    </View>
                  </View>
                </View>
                {client.items &&
                  client.items.map((item, index) => (
                    <View key={index} style={Styles.tRow}>
                      <View style={{width: '50%'}}>
                        <Text style={{textTransform: 'capitalize'}}>
                          {item.item}
                        </Text>
                      </View>
                      <View style={{width: '50%'}}>
                        <View style={Styles.lastRow}>
                          <View style={{width: '30%'}}>
                            <Text style={{textAlign: 'right'}}>
                              {item.rate}
                            </Text>
                          </View>
                          <View style={{width: '30%'}}>
                            <Text style={{textAlign: 'right'}}>
                              {item.area}
                            </Text>
                          </View>
                          <View style={{width: '40%'}}>
                            <Text style={{textAlign: 'right'}}>
                              {item.total}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
              </View>

              {/* grand */}
              <View style={Styles.tRow}>
                <View style={{width: '60%'}}>
                  <Text>thank you msg</Text>
                </View>
                <View style={{width: '40%'}}>
                  <Text style={{textAlign: 'right'}}>
                    {'Grand : ' + client.grand}
                  </Text>
                </View>
              </View>
              <View style={Styles.tRow}>
                <View style={{width: '60%'}}>
                  <View>
                    <Text>instructions</Text>
                  </View>
                </View>
                <View style={{width: '40%'}}>
                  <View style={{flexDirection: 'column'}}>
                    <View style={{marginBottom: 5}}>
                      <Text
                        style={{
                          textAlign: 'right',
                        }}>{`Paid : ${
                        openModal ? client.paid.amount : ''
                      }`}</Text>
                    </View>
                    <View style={{marginBottom: 5}}>
                      <Text
                        style={{
                          textAlign: 'right',
                        }}>{`Due : ${client.due}`}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* sign */}
              <View style={{marginTop: '5%', marginBottom: '5%'}}>
                <View style={Styles.row}>
                  <View>
                    <Text style={{marginBottom: 5}}>Date____________</Text>
                    <Text>Place___________</Text>
                  </View>
                  <View>
                    <Text style={{textAlign: 'center', marginBottom: 5}}>
                      Sign here
                    </Text>
                    <Text>______________</Text>
                  </View>
                </View>
              </View>
              {/* buttons */}
              {isCreate && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                  <Button
                    success
                    style={{marginRight: 10}}
                    onPress={handleSave}>
                    <Text> Save </Text>
                  </Button>
                  <Button info onPress={() => setOpenModal(false)}>
                    <Text> Edit</Text>
                  </Button>
                </View>
              )}
            </View>
          </ScrollView>
        </Modal>
      </View>
    </>
  );
};

const Styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '4%',
  },
  lastRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    padding: '6%',
  },
  tRow: {
    paddingTop: '2%',
    paddingBottom: '2%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#f4f4f4',
  },
  h3Color: {
    color: '#1976d2',
    textTransform: 'capitalize',
  },
});

export default BillModal;
