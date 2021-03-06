import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, } from '../../utils/BaseService';

export async function qtyToCaseQtyStr(params) {
    const url = "/swms/common/helper/qtyToCaseQtyStr";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function caseQtyStrAdd(params) {
    const url = "/swms/common/helper/caseQtyStrAdd";
    return request(query(url, params), updateBaseNullBody(null));
}

export async function queryStock(params) {
    const url = '/swms/common/helper/queryStock';
    return request(query(url, params));
}

export async function caseQtyStrSubtract(params) {
    const url = '/swms/common/helper/caseQtyStrSubtract';
    return request(query(url, params), updateBaseNullBody(null));
}

export async function queryStockExtendInfo(params) {
    const url = '/swms/common/helper/queryStockExtendInfo';
    return request(query(url, params));
}