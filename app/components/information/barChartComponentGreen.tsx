import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface BarChartComponentProps {
    data: {
        name: string;
        pv: number;
        amt: number;
    }[];
}

class BarChartComponent extends PureComponent<BarChartComponentProps> {
    render() {
        const { data } = this.props;

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
                    <Bar dataKey="pv" fill="#0D1B2A" shape={<Rectangle fill="#0E4021" stroke="#0D1B2A" />} />
                </BarChart>
            </ResponsiveContainer>
        );
    }
}

export default BarChartComponent;
