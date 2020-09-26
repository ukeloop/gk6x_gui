module.exports = {
    theme: {
        extend: {}
    },
    variants: {
        textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
        function ({addUtilities, theme, config}) {
            let newUtilities = {};
            const boxShadowPrefix = '0 0 0 3px';
            const colors = theme('colors');
            Object.keys(colors).forEach(color => {
                const colorData = colors[color];
                if (typeof colorData === 'string') {
                    newUtilities[`.outline-${color}`] = {
                        boxShadow: `${boxShadowPrefix} ${colorData}`,
                    }
                } else {
                    Object.keys(colorData).forEach(colorVariation => {
                        newUtilities[`.outline-${color}-${colorVariation}`] = {
                            boxShadow: `${boxShadowPrefix} ${colorData[colorVariation]}`,
                        }
                    });
                }
            });
            addUtilities(newUtilities, {
                variants: ['focus']
            });
        }
    ]
}
