import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import { connect } from 'react-redux';
import {saveTask} from '../actions/MainAction';

var final = [];
class WelcomePage extends Component {
    
    constructor(){
        super();
        this.renderFunction = this.renderFunction.bind(this);
        this.state ={
            finalData : []
        }
    }
    componentWillMount(){
        this.fetchTaskData();
        
    }
    componentDidMount(){
        this.fetchTaskData();
        this.reRender();
    }

    fetchTaskData(){
        var finalData = this.props.taskData;
        console.log('saved data',finalData);
        final = this.props.taskData;
        this.setState({finalData});
        // this.render();
    }

    onPressAddTask(){
        this.props.navigation.navigate('AddTask');
    }

    onPressDelete(item){
        var data = this.props.taskData;
        console.log("delete", data);
        var final =[];
        for(let i = 0; i< data.length;i++){
            if(item.id !== data[i].id){
                final.push(data[i]);
            }
        }
        this.props.saveTask(final);
    }

    renderFunction(item,index){
        console.log("flatlist", item);
        return(
            <View style ={styles.singleView}>
                <View style ={{width:'60%', height:'100%'}}>
                <Text style = {{fontSize:18}}>{item.name}</Text>
                <Text style = {{fontSize:18}}>{item.desc}</Text>
                </View>
                <View style ={{flex:1}}>
                    {/* <TouchableOpacity>
                        <Image source = {require('../assets/Pencil.png')} style = {{width:22, height:22}}/>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress = {(item) => this.onPressDelete(item)}>
                        <Image source = {require('../assets/delete_icon_dummy.png')} style = {{width:22, height:22}}/>
                    </TouchableOpacity>


                </View>

            </View>
        )
    }

    reRender(){
        
    }

    render(){
        console.log("add task", this.state.finalData);
        return(
            <View style = {styles.container}>
                <View style = {styles.headingView}>
                    <Text style = {styles.headingText}>TASK MANAGEMENT !!</Text>
                </View>
                <View style={styles.addTaskView}>
                    <TouchableOpacity onPress = {() => this.onPressAddTask()}>
                        <View style={styles.touchView}>
                            <Text style ={styles.buttonText}>Add Task</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style ={{flex:1}}>

                    <FlatList
                        data = {this.state.finalData}
                        renderItem ={this.renderFunction.bind(this)}
                        keyExtractor={(item, index) => "" + index}
                        scrollEnabled={true}>
                        </FlatList>
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
        alignItems:'center'
    },
    headingView:{
        width:'100%',
        height:'15%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'blue'
    },
    addTaskView:{
        width:'95%',
        height:'10%',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    headingText:{
        fontSize:24,
        fontWeight:'bold',
        color:'white',
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
    },
    flatListView:{
        width:'100%',
        height:'20%',
        justifyContent:'center',
        alignItems:'center'
    },
    singleView:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ebf7fa',
        justifyContent:'center',
        alignItems:'flex-start',
        flexDirection:'row'
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
    })(WelcomePage);