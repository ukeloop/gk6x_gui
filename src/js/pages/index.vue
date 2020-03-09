<template>
    <div class="fadeIn">
        <section>
            <div class="container mx-auto mt-10 mb-4 md:mb-6 text-center">
                <h1 class="text-4xl font-semibold">
                    <a href="https://ukeloop.github.io/gk6x_gui/">GK6X GUI</a>
                </h1>
                <p class="text-gray-700">
                    This tool allows you to set keys for GK6X keyboards (GK64, GK84, GK61, etc) with
                    <a class="text-indigo-700" href="https://github.com/pixeltris/GK6X"
                       target="_blank" rel="noopener">pixeltris/GK6X</a>.<br>
                    This can be used as an alternative to the official software
                    <a class="text-indigo-700" href="http://www.jikedingzhi.com/downloadlist?driverID=41latest"
                       target="_blank" rel="noopener">GK6XPlus Driver</a>.
                </p>
            </div>
        </section>
        <section class="pt-6 mb-4 md:pb-6">
            <div class="mb-2 text-center">
                <v-select class="inline-block max-w-full w-64 md:w-1/3"
                          v-model="keyboard" :options="modellist" label="Name" :clearable="false">
                </v-select>
                <button class="btn btn--secondary py-1 px-3" @click="resetConfig">Reset</button>
            </div>
            <div class="flex overflow-x-auto">
                <keyboard class="mx-auto" :keyboard="keyboard.ModelID" :layer="layer" ref="keyboard"
                          @changedKeyconfig="changedKeyconfig"></keyboard>
            </div>
            <div class="mt-2 text-center">
                <label class="keyboard__layer" v-for="l in layers">
                    <input type="radio" name="layer" v-model="layer" :value="l">
                    <span>{{ l }}</span>
                </label>
            </div>
            <div class="container mx-auto">
                <div class="mt-4 md:mt-12 max-w-3xl lg:max-w-none lg:flex lg:justify-center">
                    <div class="bg-blue-200 flex items-start lg:justify-center lg:px-12 lg:py-4 px-4 py-3 rounded-md">
                        <div class="flex-shrink-0">
                            <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div class="ml-3 flex-1 md:flex md:justify-between">
                            <p class="text-sm font-medium text-blue-700">
                                If you want to make more advanced settings, use a PCB that supports
                                <a class="font-medium text-blue-700 underline hover:text-blue-500 transition ease-in-out duration-150"
                                   href="https://github.com/qmk/qmk_firmware" target="_blank"
                                   rel="noopener">QMK Firmware</a>,
                                such as
                                <a class="font-medium text-blue-700 underline hover:text-blue-500 transition ease-in-out duration-150"
                                   href="https://kbdfans.com/products/dz60rgb-hot-swap-custom-keyboard-pcb"
                                   target="_blank" rel="noopener">DZ60RBG</a>.
                            </p>
                            <p class="mt-2 text-sm whitespace-no-wrap md:mt-0 md:ml-4">
                                <a class="font-medium text-blue-700 hover:underline hover:text-blue-500 transition ease-in-out duration-150"
                                   href="https://github.com/qmk/qmk_firmware" target="_blank">
                                    Learn more →
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container mx-auto">
                <div class="px-2 mt-8 lg:grid lg:grid-cols-2 lg:gap-8 lg:mt-16">
                    <div class="flex items-start my-6 lg:my-0">
                        <div class="flex-shrink-0">
                            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h2 class="text-lg font-medium text-gray-900">Usage</h2>
                            <ul class="list-decimal list-inside text-gray-700 mt-1 mb-2">
                                <li>
                                    Change the key configuration.
                                </li>
                                <li>
                                    When you open
                                    <a class="text-indigo-700"
                                       href="https://github.com/pixeltris/GK6X/releases" target="_blank" rel="noopener">pixeltris/GK6X</a>
                                    it will connect to your keyboard.
                                    Once it has connected it will create a file <code class="code">UserData/YOUR_MODEL_ID.txt</code>.
                                </li>
                                <li>
                                    Copy key configuration to <code class="code">UserData/YOUR_MODEL_ID.txt</code> and
                                    save.
                                </li>
                                <li>
                                    Use the <code class="code bg-green-300 text-green-800">map</code> command to apply
                                    your changes to the keyboard.
                                </li>
                            </ul>
                            <p class="mt-1 max-w-xl text-base text-gray-700 lg:mt-2">
                                The firmware doesn't allow you to reprogram the <code class="code">Fn</code> keys and
                                <code class="code">FnBase</code> layer.
                            </p>
                        </div>
                    </div>
                    <div class="flex items-start my-6 lg:my-0">
                        <div class="flex-shrink-0">
                            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 20 20">
                                    <path fill="#FFFFFF" d="M10,1C5.721,1,3.06,2.41,3.205,3.555l1.442,13.467C4.705,17.482,6.868,18.998,10,19
	c3.131-0.002,5.295-1.518,5.351-1.979l1.442-13.467C16.938,2.41,14.279,1,10,1z M10,5.291C6.868,5.289,4.647,4.174,4.647,3.756
	C4.646,3.342,6.869,2.225,10,2.227c3.131-0.002,5.354,1.115,5.351,1.529C15.351,4.174,13.131,5.289,10,5.291z"/>
                                </svg>
                            </div>
                        </div>
                        <div class="ml-4">
                            <h2 class="text-lg font-medium text-gray-900">Reset keyconfig</h2>
                            <p class="mt-1 max-w-xl text-base text-gray-700 lg:mt-2">
                                Use the <code class="code bg-yellow-300 text-yellow-800">unmap</code> command to reset
                                your
                                keyboard to the default state.
                            </p>
                        </div>
                    </div>
                </div>
                <div class="container mx-auto mt-16 px-2">
                    <div class="mt-4 border-b border-t border-gray-400 border rounded-lg overflow-hidden">
                        <div class="px-4 py-2 border-b border-gray-400 flex justify-between items-center bg-white sm:py-4 sm:px-6 sm:items-baseline">
                            <h2 class="font-regular text-base md:text-lg leading-snug truncate">
                                Keyconfig
                                <span class="text-gray-600">
                                    [{{ getKeyconfingFilename }}]
                                </span>
                            </h2>
                            <div class="flex items-center my-auto">
                                <button type="button" class="ml-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                                        @click="copyConfig">
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <title>Copy</title>
                                        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                                        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                                    </svg>
                                </button>
                                <button type="button" class="ml-3 text-gray-400 hover:text-gray-500 focus:outline-none"
                                        @click="downloadConfig">
                                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                        <title>Download</title>
                                        <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <textarea
                                class="form-textarea block w-full focus:outline-indigo-300 border-none rounded-none text-sm bg-gray-800 text-gray-300"
                                rows="12" placeholder="Your Keyconfig..." aria-label="keyconfig" ref="keyconfig"
                                v-model="config">
                        </textarea>
                    </div>
                </div>
            </div>
        </section>
        <div class="fixed" style="bottom: 12px; right: 12px;">
            <div class="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500 text-white shadow"
                 @click="downloadConfig">
                <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" class="h-6 w-6">
                    <path d="M11 14.59V3a1 1 0 0 1 2 0v11.59l3.3-3.3a1 1 0 0 1 1.4 1.42l-5 5a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 1.4-1.42l3.3 3.3zM3 17a1 1 0 0 1 2 0v3h14v-3a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3z"></path>
                </svg>
            </div>
        </div>
        <notifications group="notification" position="top right"/>
    </div>
</template>

<script>
    import modellist from "../data/device/modellist.json";
    import keyboard from "../components/keyboard";
    import {saveAs} from 'file-saver';

    export default {
        components: {
            keyboard,
        },
        data: function () {
            return {
                modellist: modellist,
                keyboard: this.getKeyboard(),
                config: this.getConfig(),
                layers: [
                    'Base',
                    'Layer1',
                    'Layer2',
                    'Layer3',
                    'FnLayer1',
                    'FnLayer2',
                    'FnLayer3',
                ],
                layer: 'Base',
            }
        },
        destroyed() {
            window.removeEventListener("beforeunload", this.beforeunload);
        },
        watch: {
            keyboard(newKeyboard) {
                localStorage.keyboard = newKeyboard.ModelID;
            }
        },
        computed: {
            getKeyconfingFilename: function () {
                return this.keyboard.ModelID ? this.keyboard.ModelID + '.txt' : 'Not selected Keyboard';
            },
        },
        methods: {
            getKeyboard: function () {
                let modelID = this.$route.query.keyboard || localStorage.keyboard;

                return modellist.filter((model) => {
                    return model.ModelID == modelID;
                })[0] || modellist[0];
            },
            changedKeyconfig: function () {
                this.config = this.getConfig();
            },
            getConfig: function () {
                if (!this.$refs.keyboard) {
                    return null;
                }
                return this.$refs.keyboard.getConfig();
            },
            resetConfig: function () {
                if (this.$refs.keyboard) {
                    this.$refs.keyboard.resetConfig();
                }
                this.resetSuccessed();
            },
            copyConfig: function (e) {
                e.preventDefault();
                this.$copyText(this.config).then((e) => {
                    this.copySuccessed(e);
                }, (e) => {
                    this.copyErrored(e);
                });
            },
            copySuccessed: function () {
                this.$notify({
                    group: 'notification',
                    text: 'You just copied the keyconfig.'
                });
            },
            copyErrored: function (e) {
                console.error(e);
                this.$notify({
                    group: 'notification',
                    type: 'error',
                    title: 'ERROR',
                    text: 'Failed to copy your keyconfig.'
                });
            },
            resetSuccessed: function () {
                this.$notify({
                    group: 'notification',
                    text: 'Reset the keyconfig.'
                });
            },
            downloadConfig: function () {
                try {
                    let blob = new Blob([this.config], {type: "text/plain;charset=utf-8"});
                    saveAs(blob, this.getKeyconfingFilename);
                } catch (e) {
                    this.downloadErrored(e);
                }
            },
            downloadErrored: function (e) {
                console.error(e);
                this.$notify({
                    group: 'notification',
                    type: 'error',
                    title: 'ERROR',
                    text: 'Failed to save your keyconfig.'
                });
            },
        },
    }
</script>