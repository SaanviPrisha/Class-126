import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class SendAPI extends React.Component {
    constructor() {
        super()
        this.state = {
            image: ""
        }
    }
    pickImage = async() => {
        try{
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3], 
                quality: 1,
            })
            if(!result.cancelled) {
                this.setState({
                    image: result.data
                })
                this.uploadImage(result.uri)
            }
        }
        catch(error) {
            console.log(error.message())
        }
    }
    uploadImage = async(uri) => {
        const data = new FormData()
        var filename = uri.split("/")[uri.split("/").length - 1]
        var type = `image/${uri.split(".")[uri.split(".").length - 1]}`
        const file = {
            uri: uri, 
            name: filename, 
            type: type
        }
        data.append("digit", file)
        fetch("http://127.0.0.1:5000/predict-digit", {
            method: "POST",
            body: data,
            headers: {"content-type": "multipart/form-data"}
        }).then((response) => {
            var r = response.json()
        }).then((result) => {
            console.log("The image was succesfully added to the API.")
            console.log(result)
        }).catch((error) => {
            console.log(error.message)
        })
    }
    render() {
        return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {
                this.pickImage()
            }}>
                <Text style={styles.text}>Upload a picture</Text>
            </TouchableOpacity>
        </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      backgroundColor: "#3ff2c2",
      width: 200, 
      height: 50, 
      borderRadius: 10, 
      alignItems: 'center',
      justifyContent: 'center'
  },
  text: {
      fontFamily: "American Typewriter", 
      fontSize: 20, 
  }
});
