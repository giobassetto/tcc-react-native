import React, {useState, useEffect} from 'react';
import {
  Image,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  ScrollView,
} from 'react-native';

import {RNCamera} from 'react-native-camera';
import Icons from 'react-native-vector-icons/MaterialIcons';
import CameraRoll from '@react-native-community/cameraroll';
import {request, PERMISSIONS, check} from 'react-native-permissions';
import {
  Container,
  BtnButtonLight,
  TextButtonLight,
  BtnButton,
  TextButton,
} from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonsPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
});

export default function PageCamera() {
  const [camera, setCamera] = useState();
  const [imageUri, setImageUri] = useState(null);
  const [renderImage, setRenderImage] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);
  const [renderCameraOrGalery, setRenderCameraOrGalery] = useState(0);
  const [photos, setPhotos] = useState([]);

  async function requestPermissionAndroid() {
    if (await check(PERMISSIONS.ANDROID.CAMERA)) {
      await request(PERMISSIONS.ANDROID.CAMERA);
    }
    if (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }

    if (await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)) {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    }
  }

  useEffect(() => {
    requestPermissionAndroid();
  }, []);

  useEffect(() => {
    if (renderCameraOrGalery === 2) {
      CameraRoll.getPhotos({
        first: 100,
        assetType: 'Photos',
      })
        .then(r => {
          setPhotos(r.edges);
        })
        .catch(err => {
          Alert.alert(`Ocorreu um erro ao carregar as fotos ${err}`);
        });
    }
  }, [renderCameraOrGalery]);

  async function takePicture() {
    try {
      if (camera) {
        const options = {
          quality: 0.5,
          base64: true,
          forceUpOrientation: true,
          fixOrientation: true,
        };
        const image = await camera.takePictureAsync(options);
        setImageUri(image.uri);
      }
    } catch (err) {
      Alert.alert(err.message);
    }
  }
  async function setPic() {
    setRenderImage(imageUri);
    await CameraRoll.saveToCameraRoll(imageUri);
    setImageUri(null);
    setRenderCameraOrGalery(0);
  }

  return renderCameraOrGalery === 0 ? (
    <Container>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Image
          source={{
            uri: renderImage,
          }}
          style={{width: 350, height: 350}}
        />
      </View>
      <View style={{alignContent: 'flex-end'}}>
        <BtnButtonLight onPress={() => setVisibleModal(true)}>
          <TextButtonLight>Selecionar Imagem</TextButtonLight>
        </BtnButtonLight>
      </View>
      <View style={{height: 300, width: 300}}>
        <Modal
          visible={visibleModal}
          transparent
          onRequestClose={() => setVisibleModal(false)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 300,
                height: 300,
                backgroundColor: '#fff',
              }}>
              <BtnButton
                onPress={() => {
                  setVisibleModal(false);
                  setRenderCameraOrGalery(1);
                }}>
                <TextButton>Câmera</TextButton>
              </BtnButton>
              <BtnButton
                onPress={() => {
                  setVisibleModal(false);
                  setRenderCameraOrGalery(2);
                }}>
                <TextButton>Galeria</TextButton>
              </BtnButton>
              <BtnButton onPress={() => setVisibleModal(false)}>
                <TextButton>Sair</TextButton>
              </BtnButton>
            </View>
          </View>
        </Modal>
      </View>
    </Container>
  ) : renderCameraOrGalery === 1 ? (
    imageUri ? (
      <ImageBackground style={styles.preview} source={{uri: imageUri}}>
        <ScrollView />
        <View style={styles.buttonsPreview}>
          <Icons
            name="cancel"
            size={50}
            color="#fff"
            onPress={() => setImageUri(null)}
          />
          <TouchableOpacity onPress={() => setPic()}>
            <Icons name="check" size={50} color="#fff" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    ) : (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            setCamera(ref);
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.front}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <Icons name="camera-alt" size={40} />
          </TouchableOpacity>
        </View>
      </View>
    )
  ) : (
    <View style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'stretch',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          {photos.map((p, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setRenderImage(p.node.image.uri);
                  setRenderCameraOrGalery(0);
                }}>
                <Image
                  key={i.toString()}
                  style={{
                    width: 200,
                    height: 100,
                    margin: 2,
                  }}
                  source={{uri: p.node.image.uri}}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

PageCamera.navigationOptions = {
  headerStyle: {
    backgroundColor: '#3700B3',
  },
  headerTintColor: '#fff',
  title: 'Camera',
};
