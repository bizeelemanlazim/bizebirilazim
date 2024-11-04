import {View, Text, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../util/Base';
import ContentHeader from '../../../component/employer/ContentHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomInput from '../../../component/CustomInput';
import CustomCheckBox from '../../../component/CustomCheckBox';
import CustomHr from '../../../component/Login/CustomHr';
import CustomButton from '../../../component/CustomButton';

const qualifications = [
  {
    id: 0,
    name: 'HTML',
  },
  {
    id: 1,
    name: 'CSS',
  },
  {
    id: 2,
    name: 'JavaScript',
  },
  {
    id: 3,
    name: 'React',
  },
  {
    id: 4,
    name: 'Node.js',
  },
  {
    id: 5,
    name: 'Express.js',
  },
  {
    id: 6,
    name: 'MongoDB',
  },
  {
    id: 7,
    name: 'SQL',
  },
  {
    id: 8,
    name: 'TypeScript',
  },
  {
    id: 9,
    name: 'Python',
  },
  {
    id: 10,
    name: 'C#',
  },
  {
    id: 11,
    name: 'C++',
  },
  {
    id: 12,
    name: 'C',
  },
  {
    id: 13,
    name: 'Java',
  },
  {
    id: 14,
    name: 'PHP',
  },
  {
    id: 15,
    name: 'Swift',
  },
  {
    id: 16,
    name: 'Kotlin',
  },
  {
    id: 17,
    name: 'Dart',
  },
  {
    id: 18,
    name: 'Ruby',
  },
  {
    id: 19,
    name: 'Go',
  },
  {
    id: 20,
    name: 'Rust',
  },
  {
    id: 21,
    name: 'Scala',
  },
  {
    id: 22,
    name: 'Perl',
  },
  {
    id: 23,
    name: 'Erlang',
  },
  {
    id: 24,
    name: 'Lisp',
  },
  {
    id: 25,
    name: 'Assembly',
  },
  {
    id: 26,
    name: 'Visual Basic',
  },
  {
    id: 27,
    name: 'R',
  },
  {
    id: 28,
    name: 'Matlab',
  },
  {
    id: 29,
    name: 'Objective-C',
  },
  {
    id: 30,
    name: 'Scratch',
  },
  {
    id: 31,
    name: 'D',
  },
  {
    id: 32,
    name: 'Fortran',
  },
  {
    id: 33,
    name: 'Julia',
  },
  {
    id: 34,
    name: 'Ada',
  },
];

export default function AdsAddStepThree({
  setActiveIndex,
  data,
  setDataValue,
  setCriterion,
}) {
  const [criteriaListCopy, setCriteriaListCopy] = useState([...qualifications]);
  const [search, setSearch] = useState('');

  function checkSelected(id) {
    let res = (data?.criterion || []).findIndex(x => x.id == id);
    return res >= 0;
  }

  function clickCheckBox(newValue, item) {
    if (newValue) {
      setCriterion([...(data?.criterion || []), item]);
    } else {
      let index = data?.criterion?.findIndex(x => x.id == item.id);
      setCriterion(removeItemOnce(data?.criterion || [], index));
    }
  }

  function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  return (
    <View style={{marginBottom: 40}}>
      <ContentHeader
        title="Nitelikler"
        text="Aradığın kişide olmasını istediğin özelliklere karar ver."
        icon={<Octicons name="star" size={27} style={{color: Colors.Gray2}} />}
        style={{marginTop: 20}}
      />
      <CustomInput
        name="Nitelikler"
        placeholder="Nitelikler"
        style={{marginTop: 25}}
        multiline={true}
        numberoflines={5}
        text={data?.attribute}
        setText={txt => setDataValue('attribute', txt)}
      />
      <CustomInput
        style={{marginTop: 30}}
        name="Kriterler"
        placeholder="Kriter Ara"
        required={false}
        text={search}
        setText={txt => {
          setSearch(txt);
          if (txt?.length > 0) {
            let res = qualifications.filter(x =>
              x.name.toLowerCase().includes(txt?.toLowerCase()),
            );
            setCriteriaListCopy([...res]);
          } else {
            setCriteriaListCopy([...qualifications]);
          }
        }}
      />
      <ScrollView
        style={{height: 100, marginTop: 20}}
        persistentScrollbar={true}>
        {criteriaListCopy.map(item => {
          return (
            <View key={item.id}>
              <CustomCheckBox
                style={{marginBottom: 5}}
                text={item.name}
                value={checkSelected(item.id)}
                onChange={newVal => clickCheckBox(newVal, item)}
              />
            </View>
          );
        })}
      </ScrollView>
      <CustomHr width="100%" />
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <CustomButton
          fill={false}
          text="Geri"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(1)}
        />
        <CustomButton
          style={{marginLeft: 5}}
          fill={true}
          text="Sonraki Adım"
          btnStyle={{paddingHorizontal: 20}}
          txtStyle={{fontSize: 20}}
          onPress={() => setActiveIndex(3)}
        />
      </View>
    </View>
  );
}
