import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DatePicker } from 'antd';

import { InputNumber } from 'antd';
import { Form, Input, Button, Checkbox, Radio } from 'antd';

//
import {
    useZaytseva,
    useFinkelstein,
    useGeibnerCherni,
    useMaslov,
    useCalorage,
    useOneTime
} from './utils/NutritionCalculator';
import {number} from "prop-types";
import CalculationError from "./utils/CalculationError";

const layout = {
    labelCol: { span: 11 },
    wrapperCol: { span: 2 },
};

export class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            ageInDays: 0,
            weight: 0,
            calcFunction: useZaytseva,
            result: ''
        };

        this.onAgeInputChange= this.onAgeInputChange.bind(this);
        this.onWeightInputChange = this.onWeightInputChange.bind(this);
        this.onCalcFunctionRadioChange = this.onCalcFunctionRadioChange.bind(this);
        this.onCalculateBtnClick = this.onCalculateBtnClick.bind(this);
    }



    private onAgeInputChange(value: number) {
        console.log(value);
        this.setState({
            ageInDays: value
        });
    }

    private onWeightInputChange(value: number) {
        this.setState({
            weight: value
        });
    }

    private onCalcFunctionRadioChange(event) {
        this.setState({
            calcFunction: event.target.value
        });
    }

    private onCalculateBtnClick() {
        console.log(this.state.calcFunction);
        console.log(this.state.weight);
        console.log(this.state.ageInDays);
        let result;
        try {
            result = this.state.calcFunction(this.state.weight, this.state.ageInDays);
        } catch (e) {
            if(e instanceof CalculationError) {
                result = e.message;
            }
        }

        if(typeof result === 'number') {
            result = result + 'ml'

        }
        console.log(result);
        this.setState({
            result: result
        })
    }


    render() {
        return (
            <div className="App">
                <header>
                    <h1>child nutrition calculator</h1>
                </header>
                <main>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Child age in days"
                            name="childAge"
                            rules={[{ required: true, message: 'Please input child age!' }]}
                        >
                            <InputNumber min={1} max={366} defaultValue={this.state.ageInDays} size={"large"} onChange={this.onAgeInputChange} />
                        </Form.Item>

                        <Form.Item
                            label="Child weight in grams"
                            name="childWeight"
                            rules={[{ required: true, message: 'Please input child weight!' }]}
                        >
                            <InputNumber min={1} max={10000} defaultValue={this.state.weight} size={"large"} onChange={this.onWeightInputChange} />
                        </Form.Item>

                        <Radio.Group onChange={this.onCalcFunctionRadioChange} value={this.state.calcFunction}>
                            <Radio value={useZaytseva}>Dr. Zaytceva's formula</Radio>
                            <Radio value={useFinkelstein}>Dr. Finkelstein's formula</Radio>
                            <Radio value={useGeibnerCherni}>Dr. Geibner and Dr. Cherni formula</Radio>
                            <Radio value={useMaslov}>Dr. Maslov's formula</Radio>
                            <Radio value={useCalorage}>Special calorage formula</Radio>
                            <Radio value={useOneTime}>One time dosage</Radio>
                        </Radio.Group>
                        <br/>
                        <Button type="primary" className="calculate-btn" onClick={this.onCalculateBtnClick}>Calculate</Button>

                        <p className='result'><b>Result:</b> {this.state.result}</p>

                    </Form>

                </main>
            </div>
        );
    }

}

export default App;
