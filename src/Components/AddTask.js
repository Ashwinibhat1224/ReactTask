import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity,TextInput, Alert} from 'react-native';
import { connect } from 'react-redux';
import {saveTask} from '../actions/MainAction';

class AddTask extends Component {
    constructor(){
        super();
        this.state ={
            name:'',
            desc:''
        }
    }

     async onPressSave(){
        console.log("add taskdata",this.props.taskData);
        
        var savedData = this.props.taskData;
        if(this.state.name.length > 0 && this.state.desc.length > 0){

            var data = {
                id: savedData.length+1,
                name : this.state.name,
                desc: this.state.desc
            }
            savedData.push(data);
            // console.log("saved data",savedData);
            
            await this.props.saveTask(savedData);
    
            Alert.alert("Task saved successfully");
    
            this.props.navigation.navigate('Welcome');
        }
        else{
            Alert.alert("Please fill the details");
        }

    }
    render(){
        return(
            <View style = {styles.container}>
                <View style ={styles.nameView}>
                    <TextInput style={styles.textFieldStyle1} placeholder ="Task name" value ={this.state.name} onChangeText ={(val) => this.setState({name:val})}>

                    </TextInput>

                </View>
                <View style = {styles.descView}>
                    <TextInput style= {styles.textFieldStyle2} multiline={true} placeholder ="Description here" value ={this.state.desc} onChangeText = {(val) => this.setState({desc:val})}></TextInput>

                </View>
                <View style ={{flex:1}}>
                    <TouchableOpacity onPress = {() => this.onPressSave()}>
                        <View style = {styles.touchView}>
                            <Text style ={styles.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container :{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    nameView:{
        width:'100%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',

    },
    textFieldStyle1:{
        width: '90%',
        height: '85%',
        borderBottomWidth: 1,
        fontSize:18
    },
    descView:{
        width:'100%',
        height:'35%',
        justifyContent:'center',
        alignItems:'center',
    },
    textFieldStyle2:{
        width: '90%',
        height: '85%',
        borderWidth: 1,
        fontSize:17
    },
    touchView:{
        width:100,
        height:40,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'black'
    },
    buttonText:{
        color:'white',
        fontSize:18
    }

});

const mapStateToProps = state =>{
    return {
        taskData : state.main.taskData
    }
};

export default connect(mapStateToProps,
    {
        saveTask
    })(AddTask);
