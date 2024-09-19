import Avatar from "@/components/avatar/avatar";
import Button from "@/components/button/button";
import Fab from "@/components/fab/fab";
import Grid from "@/components/grid/grid";
import TextInput from "@/components/textinput/textinput"
import Topbar from "@/components/navigation/topbar";
import Camera from "@/components/camera/camera";
import { getStorage, ref , uploadBytes, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import Snackbar from "@/components/snackbar/snackbar"
  
import {useRef, useState, useEffect} from "react";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native";
import { getAuth } from "firebase/auth"
import {useSession} from "@/app/ctx";
import { alterarUsuario, listarUsuarios } from "@/services/users";
import { select, update } from "@/services/database";
import { UserInterface } from "@/interfaces/User";

export default function ProfileScreen() {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [message, setMessage] = useState(null);
  const cameraRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const storage = getStorage();
  const [loading, setLoading] = useState(false);
  const {session} = useSession();
  const [data, setData] = useState<UserInterface>({
      photoURL: null
  });
 
  async function uploadToFirebase(uri, id) {
     const fetchResponse = await fetch(uri)
     const theBlob = await fetchResponse.blob()

     const imageRef = ref(getStorage(), `fotoUser/${id}.jpeg`);

     const uploadTask = uploadBytesResumable(imageRef, theBlob);
      return new Promise((resolve, reject) =>
      uploadTask.on('state_changed', 
      (snapshot) => {
    
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    
    
      }, 
      (error) => {
        reject(error)
      }, 
      async () => {
    
      const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref)
      resolve({downloadUrl, metadata: uploadTask.snapshot.metadata})
    }))
  }



  const getUser = async () => {
      const d = await select("user", ["uid", "emailVerified", "username", "displayName", "email", "photoURL", "phoneNumber", "createdAt"], `email='${session}'`, false);
      getDownloadURL(ref(storage, `fotoUser/${d.uid}.jpeg`))
      .then((url) => {
      d.photoURL = url;
      })
    .catch((error) => {
    
    });
      setData((v) => ({
          ...v,
          ...d
      }))
  }

  const _update = async () => {
      setLoading(true);
      const uploadResp = await uploadToFirebase(data.photoURL,data.uid);
      try{
          await update('user', data, data.uid)
          
          setMessage("Dados atualizados com sucesso!!!")
      }catch (err){
          setMessage("Um erro ocorreu ao atualizar o perfil.")
      }

      setLoading(false);
  }

  useEffect(() => {
      getUser();
  }, []);

  const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: false,
          aspect: [4, 3],
          quality: 1,
      });
      
      setLoading(true);

      if (!result.canceled) {
          setData((v: any) => ({
              ...v,
              photoURL: result.assets[0].uri
          }));
      }
      
      setLoading(false);
  };

  const onCapture = (photo: any) => {
      setData((v: any) => ({
          ...v,
          photoURL: photo.uri
      }));
  }

  return  <>
              <Grid>
                  <Grid>
                      <Topbar title="Perfil"/>
                  </Grid>
                  <Grid>
                      <Grid style={{
                          ...styles.containerImage
                      }}>
                          <Grid style={{
                              ...styles.containerCenterImage
                          }}>
                              {
                                  data.photoURL ? <Avatar size={230} source={{uri: data.photoURL}} /> : <Avatar size={230} icon="account" />
                              }
                              <Fab
                                  onPress={pickImage}
                                  icon="image"
                                  style={{
                                      ...styles.fab,
                                      ...styles.left
                                  }}/>
                              <Fab
                                  onPress={() => setCameraVisible(true)}
                                  icon="camera"
                                  style={{
                                      ...styles.fab,
                                      ...styles.right
                                  }}/>
                          </Grid>
                      </Grid>
                  </Grid>
                  <Grid style={{
                      marginTop: 30,
                      ...styles.padding
                  }}>
                      <TextInput
                          label="Nome"
                          value={data.displayName}
                          onChangeText={(text: string) => setData((v) => ({...v, displayName: text}))}
                      />
                  </Grid>
                  <Grid style={{
                      ...styles.padding
                  }}>
                      <TextInput
                          label="Nome de usuário"
                          value={data.username}
                          onChangeText={(text: string) => setData((v) => ({...v, username: text}))}
                      />
                  </Grid>
                  <Grid style={{
                      ...styles.padding
                  }}>
                      <TextInput
                          label="E-mail"
                          keyboardType="email-address"
                          value={data.email}
                          disabled
                      />
                  </Grid>
                  <Grid style={{
                      ...styles.padding
                  }}>
                      <TextInput
                          label="Telefone"
                          keyboardType="numeric"
                          value={data.phoneNumber}
                          onChangeText={(text: string) => setData((v) => ({...v, phoneNumber: text}))}
                      />
                  </Grid>
                  <Grid style={{
                      ...styles.padding
                  }}>
                      <Button
                          loading={loading}
                          onPress={_update}
                          mode="contained">
                          Salvar
                      </Button>
                  </Grid>
              </Grid>
              <Snackbar
                  visible={message !== null}
                  onDismiss={() => setMessage(null)}
                  duration={5000}
                  text={message}
              />
              {
                  cameraVisible ? <Camera
                      onCapture={onCapture}
                      setCameraVisible={setCameraVisible}
                      ref={cameraRef}
                  /> : null
              }
          </>
}

const styles = {
  containerImage: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  padding: {
      padding: 16
  },
  containerCenterImage: {
      width: 230,
      position: 'relative',
  },
  fab: {
      bottom: 0,
      position: 'absolute',
      borderRadius: 200
  },
  right: {
      right: 0,
  },
  left: {
      left: 0
  }
}