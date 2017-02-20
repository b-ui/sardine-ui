import React, { PropTypes } from 'react'
import { Form, Input, Col, InputNumber, Select, Modal } from 'antd'
const FormItem = Form.Item
const InputGroup = Input.Group;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const CreateBinModal = ({
  visible,
  onOk,
  onCancel,
  binTypes,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue()
      }
      let binArray = new Array();
      let shelfCount = data.endShelf - data.startShelf + 1;
      let columnCount = data.endColumn - data.startColumn + 1;
      let levelCount = data.endLevel - data.startLevel + 1;
      for(let i=0;i<shelfCount;i++){
        let currentShelfForInt = parseInt(data.startShelf) + i;
        let currentShelfForString = "" + currentShelfForInt;
        let leftCount = 6 - currentShelfForString.length;
        for(let ii = 0;ii<leftCount;ii++){
          currentShelfForString = "0" + currentShelfForString;
        }
        for(let j=0;j<columnCount;j++){
          for(let k=0;k<levelCount;k++){
            binArray[i*columnCount*levelCount + j*levelCount + k] = new Object();
            binArray[i*columnCount*levelCount + j*levelCount + k].code = currentShelfForString + (j+1) + (k+1);
            binArray[i*columnCount*levelCount + j*levelCount + k].binTypeUuid = data.binType;
            binArray[i*columnCount*levelCount + j*levelCount + k].usage = data.usage;
          }
        }
      }
      onOk(binArray);
    })
  }

  const modalOpts = {
    title: '货位新建',
    visible,
    onOk: handleOk,
    onCancel,
    wrapClassName: 'vertical-center-modal',
  }

  const binTypeOptions = [];
  if (binTypes) {
  for (let i = 0; i < binTypes.length; i++) {
    let binType = binTypes[i];
    binTypeOptions.push(
      <Select.Option key={binType.uuid}> {"[" + binType.code + "]" + binType.name} </ Select.Option>
    );
  }
  }

  return (
    <Modal {...modalOpts}>
      <Form horizontal>
        <FormItem {...formItemLayout} label="起始~截止货架：" hasFeedback>
            {getFieldDecorator('shelf' ,{
            rules: [{ required: true, message: '起始截止货架不能为空' },],
         })(
        <InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startShelf', {
            rules: [
              {
                required: true,
                message: '起始货架未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endShelf', {
            rules: [
              {
                required: true,
                message: '截止货架未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>
         )}
        </FormItem>
        <FormItem label="起始~截止列码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '起始截止列码未填写',
              },
            ],
          })(<InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startColumn', {
            rules: [
              {
                required: true,
                message: '起始列未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endColumn', {
            rules: [
              {
                required: true,
                message: '截止列未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>)}
        </FormItem>
        <FormItem label="起始~截止层码：" hasFeedback {...formItemLayout}>
          {getFieldDecorator('count', {
            rules: [
              {
                required: true,
                message: '起始截止层码未填写',
              },
            ],
          })(<InputGroup size="large">
           <Col span="6">
              {getFieldDecorator('startLevel', {
            rules: [
              {
                required: true,
                message: '起始层未填写',
              },
            ],
          })(<Input />)}
           </Col>
           <Col span="6">
              {getFieldDecorator('endLevel', {
            rules: [
              {
                required: true,
                message: '起始层未填写',
              },
            ],
          })(<Input />)}
          </Col>
        </InputGroup>)}
        </FormItem>
        <FormItem {...formItemLayout} label="货位用途：" hasFeedback>
            {getFieldDecorator('usage' ,{
            rules: [{ required: true, message: '货位用途不能为空' },],
        })(
        <Select>
                    <Select.Option value="StorageBin">存储位</Select.Option>
                    <Select.Option value="PickUpStorageBin">拣货存储位</Select.Option>
                    <Select.Option value="PickUpBin">拣货位</Select.Option>
                    <Select.Option value="UnifyReceiveStorageBin">收货暂存位</Select.Option>
                    <Select.Option value="CollectBin">集货位</Select.Option>
                    <Select.Option value="QueryRtnWrhBin">退货退仓位</Select.Option>
        </Select>
        )}
        </FormItem>
        <FormItem {...formItemLayout} label="货位类型：" hasFeedback>
            {getFieldDecorator('binType' ,{
            rules: [{ required: true, message: '货位类型不能为空' },],
        })(
        <Select>
                    {binTypeOptions}
        </Select>
        )}
        </FormItem>
      </Form>
    </Modal>
  )
}

CreateBinModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  binTypes: PropTypes.array,
}

export default Form.create()(CreateBinModal);