/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

export default class App extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            startNum: 0,
            listDate: Array()
        };
    }

    shouldComponentUpdate() {
        console.log('shouldComponentUpdate')
        return true;
    }


    _addItem = () => {
        let currentStartNum = this.state.startNum;
        let currentListDate = this.state.listDate;
        currentStartNum++;
        currentListDate.push({key: currentStartNum, text: "第" + currentStartNum + "个item", isSelect: true});
        this.setState(
            () => {
                return {startNum: currentStartNum, listDate: currentListDate};
            }
        )
    }

    _delItem = (index = 0) => {
        let currentListDate = this.state.listDate;
        currentListDate.splice(index, 1)
        // currentListDate.pop();
        this.setState(
            () => {
                return {listDate: currentListDate};
            }
        )
    }

    _onPressItem = (item, index) => {
        item.isSelect = !item.isSelect;
        this.setState(() => {
            return {};
        })
    }

    render() {
        let {startNum, listDate} = this.state;
        let itemList = [];
        listDate.map((item, index) => {
            itemList.push(
                <View key={index} style={styles.itemContent}>
                    <TouchableOpacity onPress={() => {
                        this._onPressItem(item, index);
                    }}>
                        <Text
                            style={[styles.itemTextStyle, {color: item.isSelect ? "#00a056" : "#999999"}]}>哈哈{item.text}</Text>
                    </TouchableOpacity>
                </View>
            )
        });
        return (
            <View style={styles.content}>
                <View style={styles.top}>
                    <TouchableOpacity style={styles.button} onPress={this._addItem}>
                        <Text style={styles.buttonText}>
                            add
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.vLine}/>
                    <TouchableOpacity style={styles.button} onPress={this._delItem}>
                        <Text style={styles.buttonText}>
                            del
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.vLine}/>
                    <TextInput style={styles.button}/>
                </View>
                <View style={styles.list}>
                    <ScrollView contentContainerStyle={{paddingVertical: 10, backgroundColor: "#ffff00"}}>
                        {itemList}
                    </ScrollView>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        backgroundColor: "#999999",
        flex: 1,
    },
    top: {
        flexDirection: 'row',
        height: 100
    },
    list: {
        flex: 5
    },
    buttonText: {
        fontSize: 17,
        textAlign: 'center',
        color: '#ffffff',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00a056',
    },
    vLine: {
        width: 1,
        backgroundColor: '#999999',
    },
    itemContent: {
        backgroundColor: "#ffffff",
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ff0000',
        borderBottomWidth: 1,

    },
    itemTextStyle: {
        textAlign: 'center',
        // flex: 1,
        fontSize: 15,
    }
})