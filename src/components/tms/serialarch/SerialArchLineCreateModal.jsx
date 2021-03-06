import React, { PropTypes } from 'react';
import { Form, Input, InputNumber, Modal, Row, Col, Table, Button, Select } from 'antd';
const FormItem = Form.Item;
import BaseFormItem from '../../Widget/BaseFormItem';
const Option = Select.Option;

const SerialArchLineCreateModal = ({
    visible,
    item = {},
    onOk,
    onCancel,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
    },
    serialArch = [],
}) => {
    function handleOk() {
        validateFields((errors) => {
            if (errors) {
                return;
            };
            const data = {
                ...getFieldsValue()
            };
            onOk(data);
        });
    };
    const modalOpts = {
        title: '运输线路',
        visible,
        onOk: handleOk,
        onCancel,
        wrapClassName: 'vertical-center-modal'
    };

    const options = [];
    if (serialArch != null) {
        for (var serial of serialArch) {
            options.push(<Option value={serial.title}>{serial.key}</Option>)
        };
    };

    const columns = [{
        title: '序号',
        dataIndex: 'order',
        key: 'order'
    },
    {
        title: '客户代码',
        dataIndex: 'customer.code',
        key: 'customer.code'
    },
    {
        title: '客户名称',
        dataIndex: 'customer.name',
        key: 'customer.name',
        render: text => convertState(text)
    }];

    return (
        <Modal {...modalOpts}>
            <Form horizontal>
                {/* <BaseFormItem label="线路体系：">
                    {getFieldDecorator('serialArchUuid', {
                        initialValue: item.code,
                        rules: [{
                            required: true,
                            message: '线路体系不能为空',
                        }],
                    })(<Select>{options}</Select>)}
                </BaseFormItem> */}
                <BaseFormItem label="代码：">
                    {getFieldDecorator('code', {
                        initialValue: item.code,
                        rules: [{
                            required: true,
                            message: '运输线路代码未填写',
                        }, {
                            max: 30,
                            message: '运输线路代码最大长度是30！'
                        }],
                    })(<Input />)}
                </BaseFormItem>
                <BaseFormItem label="名称：">
                    {getFieldDecorator('name', {
                        initialValue: item.name,
                        rules: [{
                            required: true,
                            message: '运输线路名称未填写',
                        }, {
                            max: 100,
                            message: '运输线路名称最大长度是100！'
                        }],
                    })(<Input />)}
                </BaseFormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(SerialArchLineCreateModal);