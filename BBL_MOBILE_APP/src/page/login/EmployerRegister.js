import {View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Header from '../../component/Login/Header';
import {Colors, Req} from '../../util/Base';
import LoginHeaderText from '../../component/Login/LoginHeaderText';
import CustomInput from '../../component/CustomInput';
import CustomHr from '../../component/Login/CustomHr';
import LoginButton from '../../component/Login/LoginButton';

import EmployerButton from '../../component/Login/EmployerButton';
import JobSeekerButton from '../../component/Login/JobSeekerButton';
import ForgetPassword from '../../component/Login/ForgetPassword';
import PhoneNumTextInput from '../../component/Login/PhoneNumTextInput';
import RegisterCheckList from '../../component/Login/RegisterCheckList';
import GoogleFacebookLogin from '../../component/Login/GoogleFacebookLogin';

import {validateAll} from 'indicative/validator';

export default function EmployerRegister() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');

  const [kvkkCheck, setKvkkCheck] = useState(false);
  const [secretCheck, setSecretCheck] = useState(false);
  const [aggrementCheck, setAggrementCheck] = useState(false);

  const [err, setErr] = useState({});

  check = async () => {
    let data = {name, surname, title, email, phone, pass, repass};
    const rules = {
      name: 'required|string',
      surname: 'required|string',
      title: 'required|string',
      email: 'required|email',
      phone: 'required|string|min:10|max:10',
      pass: 'required|min:8',
      repass: 'required|same:pass',
    };
    const messages = {
      'name.required': 'Ad alanı boş olmamalı!',
      'surname.required': 'Soyisim alanı boş olmamalı!',
      'title.required': 'Ünvan alanı boş olmamalı!',
      'email.required': 'Eposta alanı boş olmamalı!',
      'email.email': 'Geçerli bir email adresi giriniz!',
      'phone.required': 'Tel. no. alanı boş olmamalı!',
      'phone.min': 'Geçerli bir tel. no. giriniz!',
      'phone.max': 'Geçerli bir tel. no. giriniz!',
      'pass.required': 'Şifre alanı zorunlu!',
      'pass.min': 'Şifre en az 8 karakter olmalı!',
      'repass.required': 'Tekrar şifre alanı zorunlu!',
      'repass.same': 'Şifreler eşleşmiyor. Lütfen aynı şifreyi giriniz!',
    };
    try {
      await validateAll(data, rules, messages);
      setErr({});
      let res = await Req.Register({
        userTypeId: 2,
        firstName: name,
        lastName: surname,
        phoneNumber: phone,
        email: email,
        password: pass,
        confirmPassword: repass,
        commercialTitle: title
      });
      console.warn(res);
      if (!res?.isSuccess){
        if (res?.errors?.length > 0) {
          let message = "";
          res.errors.forEach(x => {
            message = message + x.split(':')[1] + "."
          })
          alert(message)
        } else {
          alert(res?.message)
        }
      } else {
        alert("kayit basarili, " + res?.message);
        //navigation.navigate("")
      }
    } catch (errors) {
      var formattedErrors = {};
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      setErr(formattedErrors);
    }
  };

  return (
    <View style={{backgroundColor: Colors.BackgroundColor, flex: 1}}>
      <Header />
      <ScrollView>
        <LoginHeaderText
          header="İş Veren Hesabı Oluştur"
          text="İş veren hesabı oluştur ve hemen ilanlarını yayınlamaya başla. Sana özel isteklere ulaş."
          style={{paddingHorizontal: 20}}
        />
        <View style={{marginTop: 30, marginBottom: 40, paddingHorizontal: 20}}>
          <CustomInput
            name="Yetkili Ad"
            placeholder="İsim"
            style={{marginBottom: 30}}
            text={name}
            setText={setName}
            errMessage={err?.name}
          />
          <CustomInput
            name="Yetkili Soyad"
            placeholder="Soyisim"
            style={{marginBottom: 30}}
            text={surname}
            setText={setSurname}
            errMessage={err?.surname}
          />
          <CustomInput
            name="Ticari Ünvan"
            placeholder="Ünvan"
            style={{marginBottom: 30}}
            text={title}
            setText={setTitle}
            errMessage={err?.title}
          />
          <CustomInput
            name="Eposta"
            placeholder="Eposta"
            style={{marginBottom: 30}}
            text={email}
            setText={setEmail}
            errMessage={err?.email}
          />

          <PhoneNumTextInput
            phone={phone}
            style={{marginBottom: 30}}
            setPhone={setPhone}
            errMessage={err?.phone}
          />

          <CustomInput
            name="Şifre"
            placeholder="Şifre"
            style={{marginBottom: 30}}
            text={pass}
            setText={setPass}
            secureTextEntry={true}
            errMessage={err?.pass}
          />
          <CustomInput
            name="Tekrar Şifre"
            placeholder="Tekrar Şifre"
            style={{marginBottom: 30}}
            text={repass}
            setText={setRepass}
            secureTextEntry={true}
            errMessage={err?.repass}
          />

          <RegisterCheckList
            kvkkCheck={kvkkCheck}
            setKvkkCheck={setKvkkCheck}
            secretCheck={secretCheck}
            setSecretCheck={setSecretCheck}
            aggrementCheck={aggrementCheck}
            setAggrementCheck={setAggrementCheck}
          />

          <EmployerButton
            disabled={!(kvkkCheck && secretCheck && aggrementCheck)}
            fullscreen={true}
            onPressFullScreen={check}
          />
          <CustomHr text="ya da" style={{marginVertical: 10}} />
          <GoogleFacebookLogin />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <LoginButton style={{marginRight: '4%'}} />
            <JobSeekerButton />
          </View>
          <ForgetPassword style={{marginTop: 10}} />
        </View>
      </ScrollView>
    </View>
  );
}
