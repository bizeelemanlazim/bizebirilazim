import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../component/Login/Header';
import {Colors, Req, Global} from '../../util/Base';
import LoginHeaderText from '../../component/Login/LoginHeaderText';
import CustomInput from '../../component/CustomInput';
import CustomHr from '../../component/Login/CustomHr';
import LoginButton from '../../component/Login/LoginButton';
import EmployerButton from '../../component/Login/EmployerButton';
import JobSeekerButton from '../../component/Login/JobSeekerButton';
import ForgetPassword from '../../component/Login/ForgetPassword';
import CustomCheckBox from '../../component/CustomCheckBox';
import GoogleFacebookLogin from '../../component/Login/GoogleFacebookLogin';
import {validateAll} from 'indicative/validator';
import {CommonActions} from '@react-navigation/native';

function Login({navigation}) {
  const [user, setUser] = useState('ugurbas8@gmail.com');
  const [pass, setPass] = useState('159Ub963.');

  const [err, setErr] = useState({});

  check = async () => {
    let data = {user, pass};
    const rules = {
      user: 'required|email',
      pass: 'required|string|min:8',
    };
    const messages = {
      'user.required': 'Eposta alanı boş olmamalı!',
      'user.email': 'Geçerli bir email adresi giriniz!',
      'pass.required': 'Şifre alanı boş olmamalı!',
      'pass.min': 'Şifre en az 8 karakter olmalı!',
    };
    try {
      await validateAll(data, rules, messages);
      setErr({});
      let res = await Req.Login({email: user, password: pass});
      if (!res?.isSuccess) {
        if (res?.errors?.length > 0) {
          let message = '';
          res.errors.forEach(x => {
            message = message + x.split(':')[1] + '.';
          });
          alert(message);
        } else {
          alert(res?.message);
        }
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Employer'}],
          }),
        );
      }
    } catch (errors) {
      console.warn(errors);
      var formattedErrors = {};
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      setErr(formattedErrors);
    }
  };

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={{flex: 0.7}}>
          <LoginHeaderText
            header="Hesabına Giriş Yap"
            text="Şimdi hesabına giriş yap ve iş ilanlarını incelemeye başla."
          />
        </View>
        <Text>{Global.Store.price}</Text>
        <View style={{flex: 1, justifyContent: 'space-around'}}>
          <CustomInput
            name="Eposta"
            placeholder="Eposta"
            text={user}
            setText={txt => setUser(txt.toLowerCase())}
            errMessage={err?.user}
          />
          <CustomInput
            name="Şifre"
            placeholder="Şifre"
            text={pass}
            setText={setPass}
            secureTextEntry={true}
            errMessage={err?.pass}
          />
          <CustomCheckBox text="Beni hatırla" />
        </View>

        <View
          style={{
            width: '100%',
            flex: 0.7,
            justifyContent: 'space-around',
            paddingBottom: 20,
          }}>
          <LoginButton fullscreen={true} onPressFullScreen={check} />
          <CustomHr text="ya da" />
          <GoogleFacebookLogin />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <JobSeekerButton style={{marginRight: '4%'}} />
            <EmployerButton />
          </View>
          <ForgetPassword />
        </View>
      </View>
    </View>
  );
}

export default Login;
