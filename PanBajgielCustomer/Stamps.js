import { StyleSheet,ImageBackground, Text, View, Image, ScrollView, AppRegistry,TouchableOpacity, Alert,Dimensions  } from 'react-native';
import React,{Component} from 'react';
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';


var {width, height} = Dimensions.get('window');



export class Stamps extends React.Component {


constructor() {
    super();

   this.state = {
    login: 'loginUsera@mail.com',
    stamps:7,
    stampsTable:[],
    };
  }

componentDidMount = () => {
  url = 'http://52.142.162.240:8081/user?login='+this.state.login

  fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            stamps: responseJson.stamps
         })
      })
      
    .catch((error) => {
         console.error(error)
      })
    
}





generateButton(){
  if(this.state.stamps == 10){
    return (
<View style={styles.insideContainer2}>
      <TouchableOpacity onPress={() => Alert.alert('tutaj funkcja do qr')}>
        <Text style={styles.textButton2}>Odbierz darmowego bajgla!</Text>
      </TouchableOpacity>

      </View>
      )
  }
  else{
    return(
    <View style={styles.insideContainer2}>
    <TouchableOpacity disabled={true} onPress={() => Alert.alert('tutaj funkcja do qr')}>
      <Text style={styles.textButton}>Odbierz darmowego bajgla!</Text>
    </TouchableOpacity>

    </View>
    )
  }
}
    
generateStamps(){
      return this.state.stampsTable.map((item,index) => {
      
        if(item==2){
         return ( 
          <View style={styles.stampsRow}>
             <View style={styles.stamped}>
                <Image  source={require('./assets/Sol.png')} style={styles.img}/>
             </View>
             <View style={styles.stamped}>
                <Image  source={require('./assets/Sol.png')} style={styles.img}/>
             </View>
      </View>

         )
        }
        if(item==1){
          return(
            <View style={styles.stampsRow}>
             <View style={styles.stamped}>
               <Image  source={require('./assets/Sol.png')} style={styles.img}/>
            </View>
            <View style={styles.empty}>
               <Image  source={require('./assets/Sol.png')} style={styles.img}/>
            </View>
          </View>
          )
        }
          if(item==0){
          return(
            <View style={styles.stampsRow}>
              <View style={styles.empty}>
                <Image  source={require('./assets/Sol.png')} style={styles.img}/>
             </View>
             <View style={styles.empty}>
                <Image  source={require('./assets/Sol.png')} style={styles.img}/>
             </View>
           </View>
          )
        }
        
      })

}
  render() {

     
        if(this.state.stamps==0){
          this.state.stampsTable = [0,0,0,0,0]
        }
        if(this.state.stamps>0){
          if(this.state.stamps==1){
            this.state.stampsTable = [1,0,0,0,0]
          }else{
            if(this.state.stamps%2==0){
                this.state.stampsTable=[]
              for(i=1;i<=5;i++){
                if(i<=Math.floor(this.state.stamps/2)){
                  this.state.stampsTable.push(2)
              
                }else{
                  this.state.stampsTable.push(0)
                }
              }

            }else{
              this.state.stampsTable=[]
              for(i=1;i<=5;i++){
                if(i<=Math.floor(this.state.stamps/2)){
                  this.state.stampsTable.push(2)
                }
                else if(i==Math.floor(this.state.stamps/2)+1){
                  this.state.stampsTable.push(1)
                }else{
                  this.state.stampsTable.push(0)
                }


              }
            }
          }
          

      }


    return (
         <ScrollView style={styles.container}>
            <View style={styles.stampsContainer}>


                {this.generateStamps()}

            </View>
         {this.generateButton()}

        </ScrollView>
          
  
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
  },
  insideContainer2:{
flexDirection: 'row',
justifyContent: 'center',
padding:20,

},
textButton: {
    backgroundColor:'#48858d',
    opacity:0.5,
   marginBottom:0.02*width,
   padding:15,
   fontSize:22,
   color:'#000000',
   borderColor: '#3f6166',
   borderRadius: 20,
   overflow: 'hidden',
   borderWidth: 2,

},
textButton2: {
    backgroundColor:'#48858d',
    opacity:0.9,
   marginBottom:0.02*width,
   padding:15,
   fontSize:22,
   color:'#ffffff',
   borderColor: '#3f6166',
   borderRadius: 20,
   overflow: 'hidden',
   borderWidth: 2,

},
img: {
  width: 0.20 * width, 
  height: 0.20 * width,
 
},
stampsContainer: {
 flexDirection: 'column',
},
stampsRow: {
  flexDirection: 'row',
  width:width,
  justifyContent:'center'
},
stamped:{
  backgroundColor: '#55858a',
  borderRadius:100,
  margin:10,
},
empty:{
  backgroundColor: '#55858a',
  borderRadius:100,
  margin:10,
  opacity:0.4
}


  });


