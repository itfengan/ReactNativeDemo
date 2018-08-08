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
    Dimensions,
    Button,
    ActivityIndicator,
    Text,
    View,
    FlatList,
} from 'react-native';

const {width, height} = Dimensions.get('window')
export default class App extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            dataArray: []
        }

    }

    componentWillMount() {
        let newList = this.state.dataArray;
        for (let i = 0; i < 20; i++) {
            newList.push({key: i, title: i + ''});
        }
    }

    _addDataRes = () => {
        let newList = this.state.dataArray;
        for (let i = 0; i <= 10; i++) {
            newList.push({key: i, title: i + ''});
        }
        this.setState(() => {
            return {dataArray: newList};
        });
    }

    /**
     * 空布局
     */
    _createEmptyView = () => {
        return (
            <View style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>
                    暂无列表数据，下啦刷新
                </Text>
            </View>
        );
    }

    refreshing = () => {
        let newList = this.state.dataArray;
        newList.splice(0, newList.length);
        for (let i = 0; i < 10; i++) {
            newList.push({key: i, title: i + ''});
        }
        this.setState(() => {
            return {dataArray: newList};
        });
    }

    _onLoad = () => {
        this._addDataRes.bind(this)
        alert('加载更多')
        // let timer = setTimeout(() => {
        //     clearTimeout(timer)
        //     this._addDataRes.bind(this)
        //     // alert('加载成功')
        // }, 200)
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Button title='滚动到指定位置' onPress={() => {
                    this._flatList.scrollToOffset({animated: true, offset: 2000});
                }}/>
                <View style={{flex: 1}}>
                    <FlatList
                        ref={(flatList) => this._flatList = flatList}
                        ListHeaderComponent={this._header}
                        ListEmptyComponent={this._createEmptyView}
                        ListFooterComponent={this._footer}
                        ItemSeparatorComponent={this._separator}
                        renderItem={this._renderItem}
                        onRefresh={this.refreshing}
                        refreshing={this.state.refreshing}
                        onEndReachedThreshold={0}
                        onEndReached={
                            this._onLoad
                        }
                        numColumns={2}
                        //numColumns>
                        columnWrapperStyle={{borderWidth: 3, borderColor: '#ff0', paddingLeft: 20}}

                        // horizontal={true}

                        getItemLayout={(data, index) => (
                            {length: 100, offset: (100 + 2) * index, index}
                        )}
                        data={this.state.dataArray}>
                    </FlatList>
                </View>

            </View>
        );
    }


    _renderItem = (item) => {
        let txt = '第' + item.index + '个' + ' title=' + item.item.title;
        let bgColor = item.index % 2 === 0 ? 'red' : 'blue';
        return <Text style={[{flex: 1, height: 100, backgroundColor: bgColor}, styles.txt]}>{txt}</Text>
    }

    _header = () => {
        return <Text style={[styles.txt, {backgroundColor: 'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        // return <Text style={[styles.txt, {backgroundColor: 'black'}]}>这是尾部</Text>;
        return <View style={{
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1
        }}>
            <ActivityIndicator
                animating={true}
                color='red'
                size="large"
            />
            <Text style={[styles.txt, {color: "#999999"}]}>这是尾部</Text>
        </View>
    }

    _separator = () => {
        return <View style={{height: 2, backgroundColor: '#00a056'}}/>;
    }


}
const styles = StyleSheet.create({
    container: {},
    content: {
        width: width,
        height: height,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cell: {
        height: 100,
        backgroundColor: 'purple',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ececec',
        borderBottomWidth: 1

    },
    txt: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: 17,
    }

})
