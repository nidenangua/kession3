<template>
    <button
        class="ks-button"
        :disabled="disabled"
        :autofocus="autofocus"
        :type="nativeType"
        :style="btnstyle"
        :class="[
        type ? 'ks-button--' + type : '',
        size ? 'ks-button--' + size : '',
        {
            'is-disabled': disabled,
            'is-loading': loading,
            'is-plain': plain,
            'is-round': round,
            'is-circle': circle,
        }
        ]"
        @click="handleClick"
    >
        <i class="ks-icon-loading" v-if="loading"></i>
        <i :class="'ks-icon-' + icon" v-if="icon && !loading"></i>
        <span v-if="$slots.default">
            <slot></slot>
        </span>
		{{btnText}}
    </button>
    
</template>
<script>
export default {
    name:'Button',
    props:{
        type: {
            type: String,
            default: 'default'
        },
        btnstyle: String,
        size: String,
        loading: Boolean,
        autofocus: Boolean,
        disabled: Boolean,
        circle: Boolean,
        round: Boolean,
        plain: Boolean,
        nativeType: {
            type: String,
            default: 'button'
        },
        icon:String,
		btnText:String
    },
    data(){
        return{
        }
    },
    methods:{
        handleClick(evt) {
            this.$emit('click', evt);
        }
    },
    mounted(){
    }
}
</script>
<style scoped>
    .ks-button {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #dcdfe6;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: .1s;
        font-weight: 500;
        -moz-user-sksect: none;
        -webkit-user-sksect: none;
        -ms-user-sksect: none;
        padding: 12px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .ks-button--primary {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
    }
    .ks-button--success {
        color: #fff;
        background-color: #48ac76;
        border-color: #48ac76;
    }
    .ks-button--info {
        color: #fff;
        background-color: #909399;
        border-color: #909399;
    }
    .ks-button--warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }
    .ks-button--danger {
        color: #fff;
        background-color: #e64a3b;
        border-color: #e64a3b;
    }
    
    .ks-button--primary.ks-plain {
        color: #409eff;
        background: #ecf5ff;
        border-color: #b3d8ff;
    }
    .ks-button--success.is-plain {
        color: #48ac76;
        background: #f0f9eb;
        border-color: #c2e7b0;
    }
    .ks-button--info.is-plain {
        color: #909399;
        background: #f4f4f5;
        border-color: #d3d4d6;
    }
    .ks-button--warning.is-plain {
        color: #e6a23c;
        background: #fdf6ec;
        border-color: #f5dab1;
    }
    .ks-button--danger.is-plain {
        color: #e64a3b;
        background: #fef0f0;
        border-color: #fbc4c4;
    }
    .ks-button.is-active, .ks-button.is-plain:active {
        border-color: #3a8ee6;
        color: #3a8ee6;
    }
    .ks-button.is-plain:active {
        background: #fff;
        outline: none;
    }
    .ks-button.is-plain:focus, .ks-button.is-plain:hover {
        background: #fff;
        border-color: #409eff;
        color: #409eff;
    }
    .ks-button:active {
        color: #3a8ee6;
        border-color: #3a8ee6;
        outline: none;
    }
    .ks-button:focus, .ks-button:hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
    }
    .ks-button--primary:focus, .ks-button--primary:hover {
        background: #66b1ff;
        border-color: #66b1ff;
        color: #fff;
    }
    .ks-button--success:focus, .ks-button--success:hover {
        background: #5ab483;
        border-color: #5ab483;
        color: #fff;
    }
    .ks-button--info:focus, .ks-button--info:hover {
        background: #a6a9ad;
        border-color: #a6a9ad;
        color: #fff;
    }
    .ks-button--warning:focus, .ks-button--warning:hover {
        background: #ebb563;
        border-color: #ebb563;
        color: #fff;
    }
    .ks-button--danger:focus, .ks-button--danger:hover {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }
    .ks-button--success.is-plain:active {
        background: #5daf34;
        border-color: #5daf34;
        color: #fff;
        outline: none;
    }
    .ks-button--success.is-plain:focus, .ks-button--success.is-plain:hover {
        background: #48ac76;
        border-color: #48ac76;
        color: #fff;
    }
    .ks-button--success.is-plain {
        color: #48ac76;
        background: #f0f9eb;
        border-color: #c2e7b0;
    }
    .ks-button--success.is-active, .ks-button--success:active {
        background: #5daf34;
        border-color: #5daf34;
        color: #fff;
    }
    .ks-button--success:active {
        outline: none;
    }
    .ks-button--success:focus, .ks-button--success:hover {
        background: #5ab483;
        border-color: #5ab483;
        color: #fff;
    }
    .ks-button--info.is-plain:active {
        background: #82848a;
        border-color: #82848a;
        color: #fff;
        outline: none;
    }
    .ks-button--info.is-plain:focus, .ks-button--info.is-plain:hover {
        background: #909399;
        border-color: #909399;
        color: #fff;
    }
    .ks-button--info.is-plain {
        color: #909399;
        background: #f4f4f5;
        border-color: #d3d4d6;
    }
    .ks-button--info.is-active, .ks-button--info:active {
        background: #82848a;
        border-color: #82848a;
        color: #fff;
    }
    .ks-button--info:active {
        outline: none;
    }
    .ks-button--info:focus, .ks-button--info:hover {
        background: #a6a9ad;
        border-color: #a6a9ad;
        color: #fff;
    }
    .ks-button--warning.is-plain:active {
        background: #cf9236;
        border-color: #cf9236;
        color: #fff;
        outline: none;
    }
    .ks-button--warning.is-plain:focus, .ks-button--warning.is-plain:hover {
        background: #e6a23c;
        border-color: #e6a23c;
        color: #fff;
    }
    .ks-button--warning.is-plain {
        color: #e6a23c;
        background: #fdf6ec;
        border-color: #f5dab1;
    }
    .ks-button--warning.is-active, .ks-button--warning:active {
        background: #cf9236;
        border-color: #cf9236;
        color: #fff;
    }
    .ks-button--warning:active {
        outline: none;
    }
    .ks-button--warning:focus, .ks-button--warning:hover {
        background: #ebb563;
        border-color: #ebb563;
        color: #fff;
    }
    .ks-button--warning {
        color: #fff;
        background-color: #e6a23c;
        border-color: #e6a23c;
    }
    .ks-button--danger.is-plain:active {
        background: #dd6161;
        border-color: #dd6161;
        color: #fff;
        outline: none;
    }
    .ks-button--danger.is-plain:focus, .ks-button--danger.is-plain:hover {
        background: #e64a3b;
        border-color: #e64a3b;
        color: #fff;
    }
    .ks-button--danger.is-plain {
        color: #e64a3b;
        background: #fef0f0;
        border-color: #fbc4c4;
    }
    .ks-button--danger.is-active, .ks-button--danger:active {
        background: #dd6161;
        border-color: #dd6161;
        color: #fff;
    }
    .ks-button--danger:active {
        outline: none;
    }
    .ks-button--danger:focus, .ks-button--danger:hover {
        background: #f56c6c;
        border-color: #f56c6c;
        color: #fff;
    }
    .ks-button.is-round {
        border-radius: 20px;
        padding: 12px 23px;
    }
    .ks-button.is-circle {
        border-radius: 50%;
        padding: 12px;
    }
    .ks-button.is-disabled, .ks-button.is-disabled:focus, .ks-button.is-disabled:hover {
        color: #c0c4cc;
        cursor: not-allowed;
        background-image: none;
        background-color: #fff;
        border-color: #ebeef5;
    }
    .ks-button--primary.is-disabled, .ks-button--primary.is-disabled:active, .ks-button--primary.is-disabled:focus, .ks-button--primary.is-disabled:hover {
        color: #fff;
        background-color: #a0cfff;
        border-color: #a0cfff;
    }
    .ks-button--success.is-disabled, .ks-button--success.is-disabled:active, .ks-button--success.is-disabled:focus, .ks-button--success.is-disabled:hover {
        color: #fff;
        background-color: #b3e19d;
        border-color: #b3e19d;
    }
    .ks-button--info.is-disabled, .ks-button--info.is-disabled:active, .ks-button--info.is-disabled:focus, .ks-button--info.is-disabled:hover {
        color: #fff;
        background-color: #c8c9cc;
        border-color: #c8c9cc;
    }
    .ks-button--warning.is-disabled, .ks-button--warning.is-disabled:active, .ks-button--warning.is-disabled:focus, .ks-button--warning.is-disabled:hover {
        color: #fff;
        background-color: #f3d19e;
        border-color: #f3d19e;
    }
    .ks-button--danger.is-disabled, .ks-button--danger.is-disabled:active, .ks-button--danger.is-disabled:focus, .ks-button--danger.is-disabled:hover {
        color: #fff;
        background-color: #fab6b6;
        border-color: #fab6b6;
    }
    .ks-button.is-disabled.is-plain, .ks-button.is-disabled.is-plain:focus, .ks-button.is-disabled.is-plain:hover {
        background-color: #fff;
        border-color: #ebeef5;
        color: #c0c4cc;
    }
    .ks-button--primary.is-plain.is-disabled, .ks-button--primary.is-plain.is-disabled:active, .ks-button--primary.is-plain.is-disabled:focus, .ks-button--primary.is-plain.is-disabled:hover {
        color: #8cc5ff;
        background-color: #ecf5ff;
        border-color: #d9ecff;
    }
    .ks-button--success.is-plain.is-disabled, .ks-button--success.is-plain.is-disabled:active, .ks-button--success.is-plain.is-disabled:focus, .ks-button--success.is-plain.is-disabled:hover {
        color: #a4da89;
        background-color: #f0f9eb;
        border-color: #e1f3d8;
    }
    .ks-button--info.is-plain.is-disabled, .ks-button--info.is-plain.is-disabled:active, .ks-button--info.is-plain.is-disabled:focus, .ks-button--info.is-plain.is-disabled:hover {
        color: #bcbec2;
        background-color: #f4f4f5;
        border-color: #e9e9eb;
    }
    .ks-button--warning.is-plain.is-disabled, .ks-button--warning.is-plain.is-disabled:active, .ks-button--warning.is-plain.is-disabled:focus, .ks-button--warning.is-plain.is-disabled:hover {
        color: #f0c78a;
        background-color: #fdf6ec;
        border-color: #faecd8;
    }
    .ks-button--danger.is-plain.is-disabled, .ks-button--danger.is-plain.is-disabled:active, .ks-button--danger.is-plain.is-disabled:focus, .ks-button--danger.is-plain.is-disabled:hover {
        color: #f9a7a7;
        background-color: #fef0f0;
        border-color: #fde2e2;
    }
    .ks-button--medium {
        padding: 10px 20px;
        font-size: 14px;
        border-radius: 4px;
    }
    .ks-button--small {
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .ks-button--mini {
        padding: 7px 15px;
        font-size: 12px;
        border-radius: 3px;
    }
    .ks-button--medium.is-round {
        padding: 10px 20px;
    }
    .ks-button--small.is-round {
        padding: 9px 15px;
    }
    .ks-button--mini.is-round {
        padding: 7px 15px;
    }

    
</style>
