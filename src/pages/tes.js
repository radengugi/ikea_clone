import { Body, Card, CardItem, Left, Right, Thumbnail } from 'native-base';
import React, { useState } from 'react';
import { Text } from 'react-native-elements';
import { Button, Overlay, Badge } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import axios from 'axios';
import { URL_API } from '../helper';
import { userTransactions } from '../actions';
import { TransactionsReducer } from '../actions'
import { Image, View } from 'react-native';
​
const CardUT = ({ data, idx }) => {
​
    const [visible, setVisibe] = useState(false)
    const dispatch = useDispatch()
    const { idUser, id } = useSelector(({ userReducer, TransactionsReducer }) => {
        return {
            id: TransactionsReducer.id,
            idUser: userReducer.id
        }
    })
​
    const getUserTransaction = () => {
        axios.get(URL_API + `/userTransactions`)
        .then(res => {
            dispatch(userTransactions(res.data))
        }).catch(err => {
            console.log(err)
        })
    }
​
    const handlePaidBt = () => {
        if (data.status == "UNPAID") {
            axios.patch(URL_API + `/userTransactions/${data.id}`, {
                status: "PAID"
            }).then(res => {
                console.log("cekcik", res.data)
                getUserTransaction()
            }).catch(err => {
                console.log("haaa", err)
            })
        }
    }
​
    const printCard = () => {
        return data.cart.map((item, index) => {
            return (
                <Card style={{display: 'flex', flexDirection: 'column', width: wp(90)}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: item.image }} />
                            <Body>
                                <Text style={{ fontSize: 18 }}>{item.nama}</Text>
                            </Body>
                        </Left>
                        <Right>
                            <Text style={{ fontSize: 18 }}>{item.qty}</Text>
                        </Right>
                    </CardItem>
                </Card>
            )
        })
    }
​
    return (
        <View>
            <Card>
                <CardItem>
                    <Left>
                        <Body>
                            <Text>{data.date}</Text>
                            <Text style={{fontWeight: 'bold'}}>Status: {data.status}</Text>
                            <Text>IDR. <Badge status="warning" containerStyle={{marginLeft: wp(2)}} value={<Text>{data.totalPayment}</Text>} /> </Text>
                        </Body>
                    </Left>
                    <Right style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
                        {
                            data.status === "UNPAID" ?
                                <Button onPress={handlePaidBt} title="PAID" type="outline" />
                                :
                                <>
                                    <Button onPress={() => setVisibe(!visible)} title="Detail" type="outline" />
                                </>
                        }
​
                    </Right>
                </CardItem>
            </Card>
            <Overlay isVisible={visible} onBackdropPress={() => setVisibe(!visible)}>
                {printCard()}
            </Overlay>
        </View>
    )
}
​
export default CardUT