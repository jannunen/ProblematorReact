import React from 'react';
import { StyleSheet, View, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';

const {
    Surface,
    Group,
    Rectangle,
    ClippingRectangle,
    LinearGradient,
    Shape,
    Text,
    Path,
    Transform
} = ART;

import {
    max,
    ticks
} from 'd3-array'

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as path from 'd3-path';
const d3 = {
    scale,
    shape,
    format,
    axis,
    path,
};

import {
    scaleLinear,
    scaleBand,
    scaleTime
}  from 'd3-scale';

const colours = {
    xAxisLabelFont : "13px helvetica",
    yAxisLabelFont : "14px helvetica",
    yAxisLabelColour : 'white',
    xAxisLabelColour : 'white',
    black: 'black',
    blue: 'steelblue',
    barFillColor : '#decc00',
    brown: 'brown',
    labelTextColor : '#decc00',
    xAxisLine : '#decc00',
    leftAxis : '#decc00',
    test : 'red'
}


class BarChart extends React.Component {

    constructor(props) {
        super(props);
        //this.createBarChart = this.createBarChart.bind(this);
        //this.drawLine = this.drawLine.bind(this);            
        //this.getRandomColor = this.getRandomColor.bind(this);
    };

    getRandomColor= () => {
        return '#' + Math.random().toString(16).substr(-6);
    }               

    drawLine = (startPoint, endPoint) => {
        var path = d3.path.path();
        path.lineTo(startPoint, endPoint);
        return path;
    }

    createBarChart = (x, y, w, h) => {
        var path = d3.path.path();
        path.rect(x, y, w, h);
        return path;
    }

    render() {
        const screen = Dimensions.get('window');
        const width = (screen.width / 2) * 0.8;
        const margin = {top: 10, right: 2, bottom: 2, left: (width/4)*3}
        const height = 50;

        const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(this.props.data.map(d => d.label))

        const maxFrequency = max(this.props.data, d => d.value)

        const y = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

        const firstLetterX = x(this.props.data[0].label)
        let secondLetterX = null;
        if (this.props.data.length == 1) {
            secondLetterX = firstLetterX;
        } else {
            secondLetterX = x(this.props.data[1].label)
        }
        
        const lastLetterX = x(this.props.data[this.props.data.length - 1].label)
        const labelDx = (secondLetterX - firstLetterX) / 2

        const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]

        const bottomAxisD = d3.shape.line()
                                .x(d => d + labelDx)
                                .y(() => 0)
                                (bottomAxis)

        const leftAxis = ticks(0, maxFrequency, 5)

        const leftAxisD = d3.shape.line()
                            .x(() => bottomAxis[0] + labelDx)
                            .y(d => y(d) - height)
                            (leftAxis)
        const notch = 5
        const labelDistance = 9
        const emptySpace = "";
        return(
            <View>
            <Surface width={screen.width} height={screen.height}>
                <Group x={margin.left} y={margin.top}>
                    <Group x={0} y={height}>
                        <Group key={-1}>
                              {
                                this.props.data.map((d, i) =>(
                                    <Group
                                        x={x(d.label) + labelDx}
                                        y={0}
                                        key={i + 1}
                                    >
                                        <Text
                                          y={labelDistance}
                                          fill={colours.xAxisLabelColour}
                                          font={colours.xAxisLabelFont}
                                        >
                                          {d.label}
                                        </Text>
                                    </Group>
                                ))
                              }
                        </Group>
                        <Group key={-2} >
                            <Shape stroke={colours.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <Group x={0} y={y(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colours.leftAxis}/>
                                        <Text
                                            fill={colours.yAxisLabelColour}
                                            x={-15}
                                            y={-labelDistance}
                                            font={colours.yAxisLabelFont}
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        {
                            this.props.data.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.label), y(d.value) - height, x.bandwidth(), height - y(d.value))}
                                        fill={colours.barFillColor == null ? this.getRandomColor() : colours.barFillColor}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </Group>
                </Group>
            </Surface>
            </View>
        )
    }
}

const styles = {
  container: {
    margin: 0,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  }
};


export default BarChart;