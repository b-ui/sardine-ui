import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva'
import { message } from 'antd';

import CarrierSearchForm from '../../components/tms/carrier/CarrierSearchForm';
import CarrierSearchGrid from '../../components/tms/carrier/CarrierSearchGrid';
import CarrierCreateModal from '../../components/tms/carrier/CarrierCreateModal';
import WMSProgress from '../../components/Widget/WMSProgress';

function Carrier({ location, dispatch, carrier }) {
    const { modalVisible, modalType, list, pagination, currentItem,
        deleteCarrierEntitys,
        onlineCarrierEntitys,
        offlineCarrierEntitys,
        batchDeleteProcessModal,
        batchOnlineProcessModal,
        batchOfflineProcessModal,
        carrierNext,
} = carrier;

    const carrierSearchFormProps = {
        onSearch(fieldsValue) {
            dispatch({
                type: 'carrier/query',
                payload: fieldsValue
            })
        },
    };

    const carrierSearchGridProps = {
        dataSource: list,
        pagination: pagination,
        onCreate() {
            dispatch({
                type: 'carrier/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
        onEdit(item) {
            dispatch({
                type: 'carrier/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item,
                }
            })
        },
        onPageChange(page, filters, sorter) {
            dispatch(routerRedux.push({
                pathname: '/tms/carrier',
                query: {
                    page: page.current,
                    pageSize: page.pageSize,
                    sort: sorter.columnKey,
                    order: sorter.columnKey == undefined ? '' : (sorter.order.indexOf("asc") > -1) ? "asc" : "desc"
                }
            }))
        },
        onRemoveBatch(carriers) {
            if (carriers.length <= 0) {
                message.warning("请选择要删除的承运商", 2, '');
                return;
            }
            dispatch({
                type: 'carrier/batchDeleteCarrier',
                payload: {
                    deleteCarrierEntitys: carriers,
                }
            })
        },
        onOnlineBatch(carriers) {
            if (carriers.length <= 0) {
                message.warning("请选择要启用的承运商", 2, '');
                return;
            }
            dispatch({
                type: 'carrier/batchOnlineCarrier',
                payload: {
                    onlineCarrierEntitys: carriers,
                }
            })
        },
        onOfflineBatch(carriers) {
            if (carriers.length <= 0) {
                message.warning("请选择要停用的承运商", 2, '');
                return;
            }
            dispatch({
                type: 'carrier/batchOfflineCarrier',
                payload: {
                    offlineCarrierEntitys: carriers,
                }
            })
        }
    };

    const carrierCreateModalProps = {
        item: modalType === 'update' ? currentItem : {},
        visible: modalVisible,
        onOk(data) {
            dispatch({
                type: `carrier/${modalType}`,
                payload: data,
            })
        },
        onCancel() {
            dispatch({
                type: 'carrier/hideModal'
            })
        },
    };

    const batchProcessDeleteCarrierProps = {
        showConfirmModal: batchDeleteProcessModal,
        records: deleteCarrierEntitys ? deleteCarrierEntitys : [],
        next: carrierNext,
        actionText: '删除',
        entityCaption: '承运商',
        batchProcess(entity) {
            dispatch({
                type: 'carrier/gridRemove',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            })
        },
        hideConfirmModal() {
            dispatch({
                type: 'carrier/hideDeleteCarrierModal',
            })
        },
        refreshGrid() {
            dispatch({
                type: 'carrier/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            })
        }
    };

    const batchProcessOnlineCarrierProps = {
        showConfirmModal: batchOnlineProcessModal,
        records: onlineCarrierEntitys ? onlineCarrierEntitys : [],
        next: carrierNext,
        actionText: '启用',
        entityCaption: '承运商',
        batchProcess(entity) {
            dispatch({
                type: 'carrier/gridOnline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            })
        },
        hideConfirmModal() {
            dispatch({
                type: 'carrier/hideOnlineCarrierModal',
            })
        },
        refreshGrid() {
            dispatch({
                type: 'carrier/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            })
        }
    };

    const batchProcessOfflineCarrierProps = {
        showConfirmModal: batchOfflineProcessModal,
        records: offlineCarrierEntitys ? offlineCarrierEntitys : [],
        next: carrierNext,
        actionText: '禁用',
        entityCaption: '承运商',
        batchProcess(entity) {
            dispatch({
                type: 'carrier/gridOffline',
                payload: {
                    uuid: entity.uuid,
                    version: entity.version,
                    token: localStorage.getItem("token"),
                }
            })
        },
        hideConfirmModal() {
            dispatch({
                type: 'carrier/hideOfflineCarrierModal',
            })
        },
        refreshGrid() {
            dispatch({
                type: 'carrier/query',
                payload: {
                    token: localStorage.getItem("token")
                }
            })
        }
    };

    const CarrierCreateModalGen = () => <CarrierCreateModal {...carrierCreateModalProps} />

    return (
        <div>
            <CarrierSearchForm {...carrierSearchFormProps} />
            <CarrierSearchGrid {...carrierSearchGridProps} />
            <CarrierCreateModalGen />
            <WMSProgress {...batchProcessDeleteCarrierProps} />
            <WMSProgress {...batchProcessOfflineCarrierProps} />
            <WMSProgress {...batchProcessOnlineCarrierProps} />
        </div>
    );
}

Carrier.propType = {
    carrier: PropTypes.object,
}

function mapStateToProps({ carrier }) {
    return {
        carrier,
    };
}

export default connect(mapStateToProps)(Carrier);