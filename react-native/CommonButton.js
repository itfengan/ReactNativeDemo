import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
// default props
const backgroundColor = '#000000';
const pressBackgroundColor = backgroundColor;
const textColor = '#FFFFFF';
const pressTextColor = textColor;

export default class CommonButton extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            //默认文字
            text: this.props.text,
            //是否不可用
            disabled: false,
            //是否按下
            pressed: false,
        };
        this._onPressIn = this._onPressIn.bind(this)
        this._onPressOut = this._onPressOut.bind(this)
    }


    static defaultProps = {
        //背景颜色
        backgroundColor: backgroundColor,
        //按下背景色
        pressBackgroundColor: pressBackgroundColor,
        //文字色
        textColor: textColor,
        //按下文字色
        pressTextColor: pressTextColor,
        //文字大小
        fontSize: 17,
        //圆角
        radius: 0,
        // onPress
        onPressFunc: null,
        //onLongPress
        onLongPressFunc: null,
        //padding
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        //text
        text: '没有设定',
        width: undefined,
        height: undefined
    }

    setDisabled(isDisabled) {
        this.setState({
            disabled: true,
        })
    }

    setButtonText(newText) {
        this.setState({
            text: newText,
        })
    }

    _onPressIn() {
        this.setState({
            pressed: true,
        })
    }

    _onPressOut() {
        this.setState({
            pressed: false,
        })
    }

    render() {
        return (
            <View>
                <TouchableHighlight
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: this.props.backgroundColor,
                        paddingLeft: this.props.paddingLeft,
                        paddingRight: this.props.paddingRight,
                        paddingTop: this.props.paddingTop,
                        paddingBottom: this.props.paddingBottom,
                        borderRadius: 8,
                    }}
                    activeOpacity={1}
                    // 底层的颜色被隐藏的时候调用。
                    onHideUnderlay={null}
                    //当底层的颜色被显示的时候调用。
                    onShowUnderlay={null}
                    // 有触摸操作时显示出来的底层的颜色。
                    underlayColor={this.props.pressBackgroundColor}
                    //disable
                    disabled={this.state.disabled}
                    //onPressIn
                    onPressIn={this._onPressIn}
                    //onPressOut
                    onPressOut={this._onPressOut}
                    //onPress
                    onPress={this.props.onPressFunc}
                    //onLongPress
                    onLongPress={this.props.onLongPressFunc}
                >
                    <View>
                        <Text style={{
                            //文字颜色
                            color: this.state.pressed ? this.props.pressTextColor : this.props.textColor,
                            fontSize: this.props.fontSize
                        }}>
                            {this.state.text}
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styls = StyleSheet.create({
    content: {}
})
