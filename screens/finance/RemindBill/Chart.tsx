import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import useLayout from 'hooks/useLayout';
import {LineChart} from 'react-native-wagmi-charts';

const ChartLine = memo(() => {
  const {width} = useLayout();

  const data = [
    {
      timestamp: 1625945400000,
      value: 33575.25,
    },
    {
      timestamp: 1625945400000,
      value: 33545.25,
    },
    {
      timestamp: 1625945400000,
      value: 33510.25,
    },
    {
      timestamp: 1625948100000,
      value: 33215.25,
    },
    {
      timestamp: 1625945400000,
      value: 33515.25,
    },
    {
      timestamp: 1625945400000,
      value: 33545.25,
    },
    {
      timestamp: 1625945400000,
      value: 33510.25,
    },
    {
      timestamp: 1625948100000,
      value: 33215.25,
    },
  ];

  return (
    <View style={styles.container}>
      <LineChart.Provider data={data} >
        <LineChart style={styles.chart } height={120}>
          <LineChart.Path color='#5099F4'/>
          <LineChart.CursorLine />
          <LineChart.CursorCrosshair
            size={20}
            outerSize={10}
            color="red"
            crosshairProps={{style: {width: 20, height: 20}}}
          />
        </LineChart>
      </LineChart.Provider>
    </View>
  );
});

export default ChartLine;

const styles = StyleSheet.create({
  chart: {
    marginTop: 32,
    height: 120,
    width: '100%',
    flex: 1,
  },
  container: {
    height: 120,
    width: '100%',
  },
});
