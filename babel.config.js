module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browserslist: [
                        "last 2 version",
                        "> 1%",
                        "ie >= 11"
                    ]
                },
                useBuiltIns: 'usage',
                corejs: '3',
            },
        ],
    ],
};