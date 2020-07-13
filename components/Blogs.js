import React, { Component, useState  } from 'react';
import { View, Text ,StyleSheet , FlatList ,TouchableHighlight , ActivityIndicator} from 'react-native';
import { getBlogs , deleteBlog , deleteBlogCloud } from '../actions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash';
import firestore from '@react-native-firebase/firestore';



class Blogs extends Component {

  constructor(props){
    super(props);
    this.state = ({
      posts : [],
      loading : true,
    });
  
  }

  componentDidMount(){
    //this.props.getBlogs(); // for firebase realtime database
    
    
      this.unsubscribe = firestore().collection('blogs')
        .onSnapshot(querySnapshot => {
          const postList = [];
    
          querySnapshot.forEach(doc => {
            postList.push({
              title: doc.data().title,
              content: doc.data().content,
              key: doc.id,
            });
          });
    
          this.setState({
            posts : postList,
            loading: false
          })
        });
    
     
  }

  render() {
    
    return (
      <View style={styles.container}>
              {this.state.loading ?  <View style={styles.container} >
                <Text>Loading...</Text>
                <ActivityIndicator size="large" ></ActivityIndicator>
            </View> : null }
              <FlatList style={{width:'100%'}} 
                    inverted
                    data={this.state.posts/*this.props.listOfBlogs */}
                     keyExtractor={(item) => item.key}
                     showsVerticalScrollIndicator={false}
                     renderItem={({item}) => {
                         return (
                             <View style={{elevation:8, marginBottom:15,borderRadius:15, backgroundColor:'black', padding:20}}>
                                 <Text style={{fontSize:28,  fontWeight:'bold', color:'#fff', marginBottom: 10,}} > {item.title}</Text>
                                 <Text style={{fontSize:18, lineHeight:30, color:'#fff'}}>{item.content}</Text>
                                 <View style={{flexDirection: 'row' , justifyContent: 'flex-end',marginTop: 25}} >
                                    <TouchableHighlight onPress={()=>this.props.navigation.navigate('Edit',{...item})} >
                                      <View style={{marginRight: 15 ,}}>
                                        <Icon size={25} color="white" name="edit" />
                                      </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight onPress={() => this.props.deleteBlogCloud(item.key) /* this.props.deleteBlog(item.key) // for realtime db delete function  */} >
                                      <View>
                                        <Icon size={25} color="white" name="trash" />
                                      </View>
                                    </TouchableHighlight>
                                   
                                 </View>  
                                  
                            </View>
                         )
                     }} />
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: "#fff",
        padding: 10
    }
});

function mapStateToProps (state){
  const listOfBlogs = _.map(state.blogsList.blogsList, (val,key)=>{
    
    return {
      ...val,
      key:key
    }
  })
  
  return {listOfBlogs }
  
}



export default connect(mapStateToProps, {getBlogs ,deleteBlog , deleteBlogCloud})(Blogs);
