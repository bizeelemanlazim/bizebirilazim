import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Global, Req, Util, Const} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import ShadowBox from '../../component/ShadowBox';
import CustomButton from '../../component/CustomButton';
import CustomHr from '../../component/Login/CustomHr';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';

function Applies({navigation}) {
  const [data, setData] = useState([]);
  const [showMyActiveApplies, setMyActiveApplies] = useState(false);

  const getDataAsync = async () => {
    let res = await Req.GetAllApplies({isActive: showMyActiveApplies, isApply: true});
    setData(res.data);
  };

  const getData = () => {
    //getDataAsync();
    Util.loadUtils([Const.UTILS.GetCities]);
  };

  //useEffect(getData, []);
  useEffect(getData, [showMyActiveApplies]);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'Başvurular']} />
          <ShadowBox>
            <View style={{paddingHorizontal: 20}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Switch
                  style={{
                    transform: [{scaleX: 0.7}, {scaleY: 0.7}],
                    marginLeft: -12,
                  }}
                  trackColor={{
                    false: Colors.SwitchDisableBackground,
                    true: Colors.Blue2,
                  }}
                  onValueChange={val => setMyActiveApplies(val)}
                  value={showMyActiveApplies}
                />
                <Text style={{fontWeight: '500', fontSize: 13, color: 'black'}}>
                  {showMyActiveApplies ? 'Aktif' : 'Pasif'} Başvurular
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.BlueLight,
                    paddingHorizontal: 10,
                    marginLeft: 5,
                    borderRadius: 10,
                    paddingVertical: 3,
                  }}>
                  <Text style={{fontSize: 13, color: Colors.Blue2}}>
                    {data.length} Adet Başvuru Bulundu
                  </Text>
                </View>
              </View>
              <Text style={{marginVertical: 5, color: Colors.Purple}}>
                Başvuruları inceleyip, değerlendirme yapabilirsiniz.
              </Text>
              <CustomButton
                text="İlan Oluştur"
                fill={true}
                icon={<Entypo name="plus" style={{color: 'white'}} size={18} />}
                style={{marginTop: 10}}
                onPress={() =>
                  navigation.navigate('EmployerAds', {screen: 'EmployerAdsAdd'})
                }
              />
            </View>
            <CustomHr width="100%" style={{marginVertical: 10}} />
            <FlatList
              data={data}
              extraData={data}
              ListHeaderComponent={LisHeader()}
              renderItem={RenderItem}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={<CustomHr width="100%" />}
              ListEmptyComponent={
                <Text
                  style={{fontSize: 20, alignSelf: 'center', marginTop: 20}}>
                  Başvuru bulunamadı.
                </Text>
              }
            />
          </ShadowBox>
        </View>
      </ScrollView>
    </View>
  );

  function LisHeader() {
    return (
      <View style={{flexDirection: 'row', flex: 1, marginHorizontal: 20}}>
        <View style={{flex: 2}}>
          <Text style={{color: 'black'}}>Başvuran İsmi</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{color: 'black'}}>Yaş</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{color: 'black'}}>İşlemler</Text>
        </View>
      </View>
    );
  }

  function RenderItem({item}) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          marginHorizontal: 20,
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <View style={{flex: 2, flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../resource/examplepp.png')}
            style={{width: 35, height: 35, borderRadius: 25}}
          />
          <Text style={{marginLeft: 5, color: 'black'}}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{color: 'black'}}>{item.birthDate}</Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Blue,
              height: 25,
              width: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialCommunityIcons
              name="eye-outline"
              size={20}
              style={{color: 'white'}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Blue,
              height: 25,
              width: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Octicons name="pencil" size={20} style={{color: 'white'}} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.Blue,
              height: 25,
              width: 25,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="delete" size={19} style={{color: 'white'}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default observer(Applies);
