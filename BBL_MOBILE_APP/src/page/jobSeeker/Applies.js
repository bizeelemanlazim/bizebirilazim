import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../util/Base';
import Header from '../../component/Header';
import Breadcrumbs from '../../component/Breadcrumbs';
import ShadowBox from '../../component/ShadowBox';
import CustomHr from '../../component/Login/CustomHr';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const data = [
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
  {name: 'Adem Simsek', age: 25},
];

export default function Applies() {
  const [showMyActiveApplies, setMyActiveApplies] = useState(false);

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <View style={{paddingHorizontal: 20}}>
          <Breadcrumbs list={['Anasayfa', 'Başvurularım']} />
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
                  {showMyActiveApplies ? 'Aktif' : 'Pasif'} Başvurularım
                </Text>
                <View
                  style={{
                    backgroundColor: Colors.BlueLight,
                    paddingHorizontal: 10,
                    marginLeft: 5,
                    borderRadius: 10,
                    paddingVertical: 3,
                  }}>
                  <Text style={{fontSize: 11, color: Colors.Blue2}}>
                    275 Adet Başvuru Bulundu
                  </Text>
                </View>
              </View>
              <Text style={{marginVertical: 5, color: Colors.Purple}}>
                Aktif olarak değerlendirilen başvurularınız.
              </Text>
            </View>
            <CustomHr width="100%" style={{marginVertical: 10}} />
            <FlatList
              data={data}
              ListHeaderComponent={LisHeader()}
              renderItem={RenderItem}
              ItemSeparatorComponent={<CustomHr width="100%" />}
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
          <Text style={{color: 'black'}}>İlan İsmi</Text>
        </View>
        <View style={{flex: 0.5}}>
          <Text style={{color: 'black'}}>Ücret</Text>
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
            source={require('../../resource/Avatar.png')}
            style={{width: 25, height: 25}}
          />
          <View style={{marginLeft: 5}}>
            <Text style={{fontSize: 13, color: 'black'}}>
              Ön Muhasebe Elemanı
            </Text>
            <Text style={{fontSize: 13, color: 'black'}}>Firma İsmi</Text>
          </View>
        </View>
        <View style={{flex: 0.7, alignItems: 'center'}}>
          <Text style={{color: 'black'}}>9000₺</Text>
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
