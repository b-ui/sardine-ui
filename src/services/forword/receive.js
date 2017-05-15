import request from '../../utils/request';
import qs from 'qs';
import { query, addTokenToUrl, createBase, updateBaseNullBody, updateBase, deleteBase } from '../../utils/BaseService';

export async function queryReceiveBill(params) {
    const url = "/forward/receive/query";
    return request(query(url, params));
}

export async function insetReceiveBill(params) {
    params.receiveBill = null;
    const url = "/forward/receive/insert";
    return request(addTokenToUrl(url), createBase(params));
}

export async function getReceiveBillByBillNo(params) {
    const url = "/forward/receive/getByBillNo";
    return request(query(url, params));
}

export async function remove(params) {
    const url = "/forward/receive/remove";
    return request(query(url, params), deleteBase(params));
}

export async function audit(params) {
    const url = "/forward/receive/audit";
    return request(query(url, params), updateBaseNullBody(null))
}

export async function update(params) {
    const url = "/forward/receive/update";
    return request(addTokenToUrl(url), updateBase(params))
}