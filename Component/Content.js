import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Tabs, Tab} from 'native-base';
import Client from './Client';
import Create from './Create';
import Gallery from './Gallery';
import {useSelector, useDispatch} from 'react-redux';
import {setActiveTab} from './Redux/ActiveTab/ActiveTabAction';
import {getClients} from './Redux/ClientReducer/ClientAction';
import {getSelectItem} from './Redux/SelectItem/SelectItemsAction';
import Login from './Login';

const MyContent = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.ActiveTab);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getSelectItem());
  }, [dispatch, activeTab]);

  return (
    <>
      {isLogin ? (
        <Tabs
          locked={true}
          onChangeTab={value => {
            dispatch(setActiveTab(value.i));
          }}
          page={activeTab}
          tabBarPosition="overlayBottom"
          tabBarUnderlineStyle={{
            top: 0,
            backgroundColor: '#128C08',
          }}>
          <Tab heading="Client">
            <ScrollView>
              <Client />
            </ScrollView>
          </Tab>
          <Tab heading="Create">
            <ScrollView>
              <Create />
            </ScrollView>
          </Tab>
          <Tab heading="Gallery">
            <ScrollView>
              <Gallery />
            </ScrollView>
          </Tab>
        </Tabs>
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  );
};
export default MyContent;
