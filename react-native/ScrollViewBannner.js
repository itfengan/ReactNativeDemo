/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * ScrollView实现Banner的demo
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //当前显示的图片索引
            currentIndex: 0,
            //在线图片数据
            imgDate: [
                "https://fenganblogimgs.oss-cn-beijing.aliyuncs.com/photos/2018-8-1_%20%E6%94%B6%E8%97%8F%E7%9A%84%E5%A3%81%E7%BA%B8.JPG",
                "https://fenganblogimgs.oss-cn-beijing.aliyuncs.com/photos/2018-8-1_%E4%BA%8C%E6%AC%A1%E5%85%83%E5%98%BF%E5%98%BF.JPG",
                "https://fenganblogimgs.oss-cn-beijing.aliyuncs.com/photos/2018-8-1_%E7%BB%9D%E6%9C%9B%E7%9A%84%E5%96%B5.JPG",
                "https://fenganblogimgs.oss-cn-beijing.aliyuncs.com/blog/1fa090890c40f16da08b790e7ea0aa45.jpg"
            ]
        };
        this.carousel = this.carousel.bind(this);
        this.dragStart = this.dragStart.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        this.onAnnotationEnd = this.onAnnotationEnd.bind(this)
    }



    componentDidMount() {
        this.carousel()
    }

    //点击圆点，关闭定时器，并设置当前图片索引
    dotClick(index) {
        clearInterval(this.carouselTimer);
        this.setState({
            currentIndex: index
        }, () => {
            let ScrollView = this.refs.scrollView;
            const currentX = this.state.currentIndex * Dimensions.get('window').width;
            ScrollView.scrollResponderScrollTo({x: currentX, animated: true})
        })
    }

    //开始拖动，关闭定时器
    dragStart() {
        clearInterval(this.carouselTimer);
    }

    //拖动结束，开启定时器
    dragEnd() {
        this.carousel()
    }

    //定时器
    carousel() {
        let ScrollView = this.refs.scrollView;
        const timer = 4000;
        let currentIndex = this.state.currentIndex;
        this.carouselTimer = setInterval(() => {
            currentIndex === this.state.imgDate.length - 1 ? currentIndex = 0 : currentIndex++
            this.setState({
                currentIndex: currentIndex
            }, () => {
                const currentX = currentIndex * Dimensions.get('window').width;
                ScrollView.scrollResponderScrollTo({x: currentX, animated: true})
            })
        }, timer)

    }

    //当一帧滚动完毕时，重新设置当前图片的索引
    onAnnotationEnd(e) {
        const offSetX = e.nativeEvent.contentOffset.x;
        const currentIndex = offSetX / Dimensions.get('window').width;
        this.setState({
            currentIndex: currentIndex
        })
    }

    render() {
        const {imgDate, currentIndex} = this.state;
        const screenWidth = Dimensions.get('window').width;
        const imgDataList = imgDate.map((elem, index) => {
            return (
                <Image key={index} style={{width: screenWidth, height: 240}} source={{uri: elem}}/>
            )
        });
        const dotList = imgDate.map((elem, index) => {
            return (
                <Text onPress={this.dotClick.bind(this, index)} key={index}
                      style={[styles.dotStyle, {backgroundColor: currentIndex === index ? "red" : "#fff"}]}/>
            )
        })
        return (
            <View>
                <Text style={styles.myTitleStyle}>ScrollView轮播图</Text>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onScrollBeginDrag={this.dragStart}
                    onScrollEndDrag={this.dragEnd}
                    onMomentumScrollEnd={this.onAnnotationEnd}
                >
                    {imgDataList}
                </ScrollView>
                <View style={styles.dotView}>{dotList}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    myTitleStyle: {
        flexDirection: 'row',
        fontSize: 30,
        color: '#000',
        textAlign: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        marginTop: 24,
        marginBottom: 24
    },
    dotStyle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 10,
    },
    dotView: {
        flexDirection: 'row',
        marginLeft: 15,
        position: 'absolute',
        bottom: 10
    }
});
