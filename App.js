import { StatusBar } from 'expo-status-bar';import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, FlatListcle, FlatList ,Modal, TouchableNativeFeedback} from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import colors from "./Colors";
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal.js';





export default class App extends React.Component {

  state = {
      addTodoVisible: false,
      lists: tempData
  };



  

  toggleAddTodoModal(){
     
    this.setState({addTodoVisible: !this.state.addTodoVisible})
  }



  renderList = list => {

      return <TodoList list={list} updateList={this.updateList}/>

  };


  addList = list => {
    this.setState({lists: [...this.state.lists,{...list, id: this.state.lists.length + 1,todos: []}]});
  };


  updateList = list => {
    this.setState({
        lists: this.state.lists.map(item=>{
            return item.id === list.id ? list: item;




        })


    });

  };

  render(){
    return (
      <View style={styles.container}>
        <Modal 
          animationType='slide'
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
            <AddListModal closeModal={()  => this.toggleAddTodoModal()} addList={this.addList}/>
        </Modal>



        <View style={{flexDirection: "row"}}>
          <View style={styles.divider} />
          <Text style={styles.title}>
              What_to_Do <Text style={{fontWeight:"300",color:colors.blue}}>List</Text>
          </Text>
          <View style={styles.divider} />
        </View>

          <View style={{marginVertical: 48}}>
              <TouchableOpacity style={styles.addlist}  onPress={() => this.toggleAddTodoModal()}>
                <AntDesign name="plus" size={16} color={colors.blue} />
              </TouchableOpacity>



              <Text style={styles.add}>Add List</Text>
          </View>


          <View style={{height: 275, paddingLeft:32}}>
              <FlatList  
               data={this.state.lists}
               keyExtractor={item => item.name}
               horizontal={true} 
               showsHorizontalScrollIndicator={false}
               renderItem={({item}) =>  this.renderList(item) }  
               keyboardShouldPersistTaps='always'      
              />
         </View>
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
  divider:{
      backgroundColor: colors.lisghBlue,
      height:1,
      flex:1,
      alignself: "center"
  },
  title:{
    fontSize: 38,
    fontWeight: "700",
    color: colors.black,
    paddingHorizontal: 64
  },
  addlist:{
    borderWidth:2,
    borderColor: colors.lisghBlue,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  add:{
      color: colors.blue,
      fontWeight: "600",
      fontSize: 14,
      marginTop: 8
  }
});
