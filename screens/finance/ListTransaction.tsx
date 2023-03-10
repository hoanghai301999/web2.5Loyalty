import React, { memo,useEffect,useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useTheme, TopNavigation, Layout, Icon } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import Transaction from "components/Transaction";
import CurrencyText from "components/CurrencyText";
import NavigationAction from "components/NavigationAction";
import AnimatedAppearance from "components/AnimatedAppearance";

import keyExtractor from "utils/keyExtractor";
import { Images } from "assets/images";
import { FinanceStackParamList } from "navigation/type";
import { RefreshControl } from "react-native-web-refresh-control";
import { Category_Types_Enum, TransactionFragment } from "constants/Type";
import { RootStackParamList } from "navigation/type";
import authServices from "../../services/auth.services";
import UserService from "../../services/user.service";
import Expense from "./MonthChart/Income";

export type ListTransaction = {
  totalExpense: number;
  totalIncome: number;
  transactions: TransactionFragment[];
};

const ListTransaction = memo(() => {
  const [userInfo, setUserInfo] = useState(null);
  const [dataTransaction, setDataTransaction] = useState(null);
  const [totalExpenseData, setTotalExpenseData] = useState(null);
  const [totalIncomeData, setTotalIncomeData] = useState(null);
  const [totalTransaction, setTotalTransaction] = useState(null);
  useEffect(() => {
    async function setUserData() {
      const user = await authServices.getCurrentUser();
      const transactions = await UserService.getUserHistory(user.address);
      const dataArr=[];
      transactions.forEach(item => {
        dataArr.push({
          id: item.transactionId,
          name: item.type == "expense" ? "Send" : "Received"  ,
          note: "",
          amount: item.amount,
          type_id: item.type,
          category: {
            id: "category_id1",
            icon: { path: Images.heartIc },
          },
          transaction_at: (new Date(item.createdAt)).getTime()
        })
      });
      setDataTransaction(dataArr);
      const ExpenseData = await dataArr.filter((el)=>{
        return el.type_id == "expense"
      })
      
      const sumWithExpense = await ExpenseData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,0
      );
      setTotalExpenseData(sumWithExpense);



      const IncomeData = await dataArr.filter((el)=>{
        return el.type_id == "income"
      })
      
      const sumWithIncome = await IncomeData.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,0
      );
      setTotalIncomeData(sumWithIncome);


      const sumWithAll = sumWithIncome - sumWithExpense;
      setTotalTransaction(sumWithAll);
    }
    setUserData()
  }, []);
  const theme = useTheme();
  const { top, bottom } = useLayout();
  const { navigate, goBack } = useNavigation<
  NavigationProp<RootStackParamList>
>();
  
  const data: ListTransaction = {
    totalExpense: totalExpenseData,
    totalIncome: totalIncomeData,
    transactions: dataTransaction
  };

  const listHeaderComponent = React.useCallback(() => {
    return (
      <AnimatedAppearance>
        <View style={styles.row}>
          <View
            style={[
              styles.box,
              { backgroundColor: theme["color-radical-600"] },
            ]}
          >
            <Text category="headline" status="white">
              Send
            </Text>
            <CurrencyText
              category="title3"
              status="white"
              children={data.totalExpense}
              marginTop={4}
            />
          </View>
          <View
            style={[
              styles.box,
              {
                marginLeft: 16,
                backgroundColor: theme["color-salmon-600"],
              },
            ]}
          >
            <Text category="headline" status="white">
              Received
            </Text>
            <CurrencyText
              category="title3"
              status="white"
              children={data.totalIncome}
              marginTop={4}
            />
          </View>
        </View>
      </AnimatedAppearance>
    );
  }, [data.totalExpense, data.totalIncome]);

  const renderItem = React.useCallback(({ item, index }) => {
    return <Transaction item={item} index={index}  />;
  }, []);

  return (
    <Container useSafeArea={false}>
      <Layout level="2" style={[styles.header, { paddingTop: top }]}>
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction icon="leftArrow" />}
          accessoryRight={
            <Text onPress={()=>navigate("Finance",{screen:"AddTransaction"})} marginRight={16} status="primary">
              Create
            </Text>
          }
        />
        <Text category="title2" marginLeft={16}>
          History Transaction
        </Text>
        
      </Layout>
      <FlatList
        data={data.transactions || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeaderComponent}
        contentContainerStyle={[
          styles.contentContainerStyle,
          { paddingBottom: bottom + 48 },
        ]}
        refreshControl={<RefreshControl tintColor="#F0DF67" />}
      />
      <View
        style={[
          styles.bottom,
          {
            paddingBottom: bottom + 8,
            backgroundColor: theme["color-primary-100"],
          },
        ]}
      >
        <Icon
          pack="assets"
          name="barChart1"
          style={{ tintColor: theme["color-patrick-blue-100"] }}
        />
        <Text category="subhead" status="description">
          Total :{" "}
          <CurrencyText category="title4" status="black" children={totalTransaction} />
        </Text>
        <Icon
          pack="assets"
          name="happyFace"
          style={{ tintColor: theme["color-patrick-blue-100"] }}
        />
      </View>
    </Container>
  );
});

export default ListTransaction;

const styles = StyleSheet.create({
  header: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 16,
  },
  box: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
  },
  contentContainerStyle: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  bottom: {
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
});
