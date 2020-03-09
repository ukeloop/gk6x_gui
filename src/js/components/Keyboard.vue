<template>
    <div>
        <div class="keyboard relative" :style="keyboardSize">
            <key v-for="key of keys" :keydata="key" :top="top - 15 * (1 + config.ShowScalePlus)" :left="left - 15 * (1 + config.ShowScalePlus)" :config="config" :layer="layer" :ref="key.KeyName"
                 @changedKeyconfig="changedKeyconfig"></key>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import key from './key';

    export default {
        components: {
            key,
        },
        props: {
            keyboard: {
                default: null,
            },
            layer: {
                type: String,
                default: 'Base',
            },
        },
        data: function () {
            return {
                config: {},
                keys: [],
            }
        },
        mounted() {
            this.setConfig();
            this.setKeymap();
        },
        watch: {
            keyboard: function (newKeyboard) {
                this.setConfig();
                this.setKeymap();
            },
        },
        computed: {
            keyboardSize() {
                this.top = this.bottom = this.left = this.right = undefined;
                for (let key of this.keys) {
                    let top = key.Position.Top;
                    if (this.top === undefined || this.top > top) {
                        this.top = top;
                    }

                    let bottom = key.Position.Top + key.Position.Height;
                    if (this.bottom === undefined || this.bottom < bottom) {
                        this.bottom = bottom;
                    }

                    let left = key.Position.Left;
                    if (this.left === undefined || this.left > left) {
                        this.left = left;
                    }

                    let right = key.Position.Left + key.Position.Width;
                    if (this.right === undefined || this.right < right) {
                        this.right = right;
                    }
                }

                return {
                    width: (this.right - this.left + 40) * (1 + this.config.ShowScalePlus) + 'px',
                    height: (this.bottom - this.top + 40) * (1 + this.config.ShowScalePlus) + 'px',
                };
            },
        },
        methods: {
            setConfig: function () {
                axios
                    .get('https://raw.githubusercontent.com/pixeltris/GK6X/master/Build/Data/device/' + this.keyboard + '/config.json')
                    .then(response => {
                        this.config = response.data;
                    })
                    .catch(error => {
                        this.$notify({
                            group: 'notification',
                            type: 'error',
                            title: 'ERROR',
                            text: error.message
                        });
                        console.error(error);
                    });
            },
            setKeymap: function () {
                axios
                    .get('https://raw.githubusercontent.com/pixeltris/GK6X/master/Build/Data/device/' + this.keyboard + '/data/keymap.js')
                    .then(response => {
                        this.keys = response.data;
                    })
                    .catch(error => {
                        this.$notify({
                            group: 'notification',
                            type: 'error',
                            title: 'ERROR',
                            text: error.message
                        });
                        console.error(error);
                    });
            },
            changedKeyconfig: function (args) {
                this.$emit('changedKeyconfig', args);
            },
            getConfig: function () {
                let config = '';

                for (let key of this.keys) {
                    config += this.$refs[key.KeyName][0].getKeyconfig();
                }

                return config;
            },
            resetConfig: function () {
                for (let key of this.keys) {
                    this.$refs[key.KeyName][0].resetKeyconfig();
                }
            },
        },
    }
</script>
