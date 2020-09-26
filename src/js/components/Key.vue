<template>
    <div>
        <div class="key absolute" :class="[keyNameClass]" v-html="getKeyName" @click="showModal"
             v-show="isShow" :style="{
             width: keydata.Position.Width * (1 + config.ShowScalePlus) + 'px',
             height: keydata.Position.Height * (1 + config.ShowScalePlus) + 'px',
             top: (keydata.Position.Top - top) * (1 + config.ShowScalePlus) + 'px',
             left: (keydata.Position.Left - left) * (1 + config.ShowScalePlus) + 'px',
             }"></div>
        <keyConfigModal :keydata="keydata" :keyconfig.sync="keyconfig" ref="modal"></keyConfigModal>
    </div>
</template>

<script>
import keyConfigModal from './KeyConfigModal';

export default {
    components: {
        keyConfigModal,
    },
    props: {
        keydata: {
            type: Object,
            default: {},
        },
        top: {
            type: Number,
            default: 0,
        },
        left: {
            type: Number,
            default: 0,
        },
        config: {
            type: Object,
            default: {},
        },
        layer: {
            type: String,
            default: 'Base',
        },
    },
    data: function () {
        return {
            layers: [
                'Base',
                'Layer1',
                'Layer2',
                'Layer3',
                'FnLayer1',
                'FnLayer2',
                'FnLayer3',
            ],
            keyconfig: {
                Base: [],
                Layer1: [],
                Layer2: [],
                Layer3: [],
                FnLayer1: [],
                FnLayer2: [],
                FnLayer3: [],
            },
        }
    },
    mounted() {
        this.setKeyconfig();
    },
    watch: {
        keyconfig: {
            handler: function (newVal, oldVal) {
                this.saveKeyconfig(newVal);

                let args = {
                    key: this.keydata.KeyName,
                    config: newVal,
                };
                this.$emit('changedKeyconfig', args);
            },
            deep: true,
        },
        keydata: {
            handler: function (newVal, oldVal) {
                this.setKeyconfig();
            }
        },
    },
    computed: {
        isShow: function () {
            return this.keydata.LogicCode !== -1;
        },
        getKeyName: function () {
            return this.keyconfig[this.layer] && this.keyconfig[this.layer].show || (this.keydata.Show || this.keydata.KeyName);
        },
        keyNameClass: function () {
            return this.keyconfig[this.layer] && this.keyconfig[this.layer].show ? 'key--changed' : '';
        },
    },
    destroyed() {
        this.resetKeyconfig().saveKeyconfig();
    },
    methods: {
        setKeyconfig: function () {
            let keyconfig = localStorage.keyconfig ? JSON.parse(localStorage.keyconfig) : {};

            for (let layer of this.layers) {
                this.keyconfig[layer] = [];
                if (keyconfig[this.keydata.LocationCode]) {
                    if (keyconfig[this.keydata.LocationCode][layer]) {
                        this.keyconfig[layer] = keyconfig[this.keydata.LocationCode][layer];
                    }
                }
            }

            return this;
        },
        resetKeyconfig: function () {
            for (let layer of this.layers) {
                this.keyconfig[layer] = [];
            }

            return this;
        },
        getKeyconfig: function () {
            return this.$refs.modal.keyconfigStr();
        },
        saveKeyconfig: function (newVal) {
            let keyconfig = localStorage.keyconfig ? JSON.parse(localStorage.keyconfig) : {};
            keyconfig[this.keydata.LocationCode] = newVal;
            localStorage.keyconfig = JSON.stringify(keyconfig);

            return this;
        },
        showModal: function () {
            this.$refs.modal.open();
        },
    }
}
</script>