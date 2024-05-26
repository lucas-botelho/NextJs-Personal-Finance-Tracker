import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const data = [
    {
        name: 'January',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'February',
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'March',
        pv: 1200,
        amt: 2290,
    },
    {
        name: 'April',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'May',
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'June',
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'July',
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'August',
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'September',
        pv: 1398,
        amt: 2210,
    },

    {
        name: 'October',
        pv: 1200,
        amt: 2290,
    },
    {
        name: 'November',
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'December',
        pv: 4800,
        amt: 2181,
    },
];

class BarChartComponent extends PureComponent {
    render() {
        return (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pv" fill="#0D1B2A" activeBar={<Rectangle fill="#0E4021" stroke="#0D1B2A" />} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default BarChartComponent;
