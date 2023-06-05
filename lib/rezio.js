"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAWSDetail = exports.getEnv = void 0;
function getEnv(eventName, ref) {
    if (eventName === 'push') {
        return ref.endsWith('master')
            ? 'sta'
            : ref.includes('stable/')
                ? 'uat'
                : ref.includes('feature/')
                    ? 'sit'
                    : null;
    }
    else if (eventName === 'release') {
        return 'prod';
    }
    return null;
}
exports.getEnv = getEnv;
function getAWSDetail(env = 'sit') {
    const region = env === 'prod' || env === 'sta' ? 'ap-northeast-1' : 'ap-southeast-1';
    const cluster = env === 'prod' || env === 'sta'
        ? 'tako-prod'
        : env === 'uat'
            ? 'tako-uat'
            : 'rezio-dev';
    return {
        region,
        cluster
    };
}
exports.getAWSDetail = getAWSDetail;
