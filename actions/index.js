import firebase from '../fb';
import firestore from '@react-native-firebase/firestore';

export function  getBlogs (){
    return(dispatch) => {
        firebase.database().ref('/blogs').on('value', snapshot => {
            dispatch({
                type:"BLOGS_FETCH",
                payload: snapshot.val() ,
            })
        })
    }
}

export function postBlogs(title , content){
    return(dispatch) => {
        firebase.database().ref('/blogs').push({title,content});
    }
}
export function deleteBlog(key){
    return(dispatch) => {
        firebase.database().ref(`/blogs/${key}`).remove();
    }
}

export function editBlog(title , content ,key){
    return(dispatch) => {
        firebase.database().ref(`/blogs`).child(key).update({title, content});
    }
}
//// there are firestore function below ///////////////

export function addBlogCloud(title , content ){
    
  /*  if(!firebase.length){
       firebase.initializeApp( config); 
    } */
    return(dispatch) => {
        firestore().collection('blogs').add({title:title , content: content });
    }
}
export function deleteBlogCloud(key){
    return(dispatch) => {
        firestore().collection('blogs').doc(`${key}`).delete();
    }
}
export function editBlogCloud(title , content ,key){
    return(dispatch) => {
        firestore().collection('blogs').doc(`${key}`).update({
            title: title,
            content: content
        });
    }
}


