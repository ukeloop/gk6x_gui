<template>
    <modal :name="modalName()" height="auto" :resizable="true" :adaptive="true" :draggable="true" :scrollable="true"
           :reset="true">
        <div class="p-4">
            <h2 class="text-2xl font-semibold mb-4">{{ keydata.KeyName + ' key config' }}</h2>
            <div class="my-2" v-for="(v, k) in keyconfig">
                <h3 class="text-lg mb-1">{{ k }}</h3>
                <v-select class="my-1" v-model="keyconfig[k]" :options="keys" label="name"></v-select>
            </div>
            <details class="mt-4 border-b border-t border-gray-400 border rounded-lg overflow-hidden">
                <summary class="px-4 py-2 flex items-center bg-white sm:items-baseline">
                    <h2 class="font-regular text-base md:text-lg leading-snug truncate">
                        Keyconfig
                    </h2>
                    <div class="flex items-center ml-auto my-auto">
                        <button type="button" class="ml-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                                @click="copyConfig">
                            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <title>Copy</title>
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                            </svg>
                        </button>
                    </div>
                </summary>
                <textarea
                        class="form-textarea block w-full focus:outline-indigo-300 border-none rounded-none text-sm bg-gray-800 text-gray-300"
                        rows="8" placeholder="Keyconfig..." ref="keyconfig" v-model="textarea">
                </textarea>
            </details>
            <div class="text-right mt-6">
                <button class="btn w-24" @click="close">OK</button>
            </div>
        </div>
    </modal>
</template>

<script>
    import keys from '../data/keys.json';

    export default {
        props: {
            keydata: {
                type: Object,
                required: true,
                default: {},
            },
            keyconfig: {
                type: Object,
                required: true,
                default: {},
            },
        },
        data: function () {
            return {
                keys: keys,
                textarea: null,
            }
        },
        mounted() {
            this.keyconfigStr();
        },
        methods: {
            modalName: function () {
                return 'modal-' + this.keydata.KeyName;
            },
            open: function () {
                this.$modal.show(this.modalName());
            },
            close: function () {
                this.$modal.hide(this.modalName());
            },
            keyconfigStr: function () {
                let key = this.keys.find(x => x.LogicCode === this.keydata.LogicCode);
                let configs = [];
                this.textarea = '';

                if (key === undefined) {
                    return '';
                }

                for (let k in this.keyconfig) {
                    if (!this.keyconfig[k] || !this.keyconfig[k].name || this.keydata.Show === this.keyconfig[k].name) {
                        continue;
                    }

                    if (configs[this.keyconfig[k].name] === undefined) {
                        configs[this.keyconfig[k].name] = [];
                    }

                    configs[this.keyconfig[k].name].push(k);
                }

                for (let k in configs) {
                    let layers = configs[k];
                    this.textarea += "[" + layers.join(',') + "]\n";
                    this.textarea += key.name + ":" + k + "\n";
                    this.textarea += "\n";
                }

                return this.textarea;
            },
            copyConfig: function (e) {
                e.preventDefault();
                this.$copyText(this.textarea).then((e) => {
                    this.copySuccessed(e);
                }, (e) => {
                    this.copyErrored(e);
                });
            },
            copySuccessed: function (e) {
                this.$notify({
                    group: 'notification',
                    text: 'You just copied the keyconfig.'
                });
            },
            copyErrored: function (e) {
                this.$notify({
                    group: 'notification',
                    type: 'error',
                    title: 'Error',
                    text: 'Failed to copy texts.'
                });
            },
        }
    }
</script>
