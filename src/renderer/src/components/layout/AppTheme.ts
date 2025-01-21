import { colorsTuple, createTheme, rem } from '@mantine/core';

const theme = createTheme({
    
    breakpoints: {
        xxs: "10em",
        xs: '30em',
        sm: '48em',
        md: '64em',
        lg: '74em',
        xl: '90em',
    },
    colors: {
        blue: [
            "#f0f3fa",
            "#dee4ee",
            "#b9c6df",
            "#90a7d0",
            "#6f8cc4",
            "#5a7bbd",
            "#4f73ba",
            "#3f61a5",
            "#375693",
            "#2a4a83"
        ],
        orange: [
            "#fff0eb",
            "#f6dfda",
            "#e5bfb5",
            "#d69b8e",
            "#c97e6c",
            "#c16b56",
            "#be614a",
            "#a8503b",
            "#974633",
            "#853a29"
        ],
        green: [
            "#e6fff0",
            "#d1fee0",
            "#a1fbbf",
            "#6efa9c",
            "#47f97e",
            "#31f86c",
            "#24f861",
            "#18dd51",
            "#05c446",
            "#00aa38"
        ],
        red: [
            "#ffe7e9",
            "#ffced0",
            "#ff9b9f",
            "#ff636c",
            "#ff363f",
            "#ff1823",
            "#ff0314",
            "#e40008",
            "#cc0006",
            "#b20001"
        ],
        gray: [
            "#f4f5f6",
            "#e7e7e7",
            "#cccccc",
            "#afafb0",
            "#96979a",
            "#86888d",
            "#7d8188",
            "#6a6e76",
            "#5d626a",
            "#4e555f",
            "#f1f5f8"
        ],
        success: [
            "#F0F3EB",
            "#e1f2eb",
            "#bde5d4",
            "#95d7bb",
            "#76cca6",
            "#61c599",
            "#56c192",
            "#46aa7e",
            "#3b976f",
            "#2a835e"
        ],
        error: [
            "#faf0f0",
            "#eddddd",
            "#dfb7b7",
            "#d18e8d",
            "#c66c6b",
            "#bf5654",
            "#bd4b49",
            "#a73d3b",
            "#953533",
            "#832a2a"
        ],
        darkGray: colorsTuple("#212A2B"),
        secondary: colorsTuple("#344346"),
        primary: colorsTuple("#FE4A23"),
        dashboardBg: colorsTuple("#1A2222"),
        navBard: colorsTuple('#344346'),
        linkColor: colorsTuple("#F9FBFB"),
        activeLinkColor: colorsTuple("#FE4A23"),
    },

    primaryColor: "primary",
    fontFamily: "inter",
    primaryShade: 9,
    defaultRadius: 8,
    fontSmoothing: true,
    white: "#F9FBFB",
    fontSizes: {

    },
    shadows: {
        md: '2px 2px 10px rgba(0, 0, 0, .10)',
        xl: '5px 5px 3px rgba(0, 0, 0, .10)',
    },
    headings: {
        fontWeight: "400",
        fontFamily: 'sora',
        sizes: {
            h1: { fontSize: rem(36) },
        },
    },
    components: {
        'TextInput': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "#F9FBFB",
                    marginBottom: 8
                },
                input: {
                    borderColor: "#FE4A23",
                    background: "#344346",
                    color: "#F9FBFB",
                },
                root: {
                    marginBottom: 16
                }
            }
        },
        'DateInput': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "#F9FBFB",
                    marginBottom: 8
                },
                input: {
                    borderColor: "#FE4A23",
                    background: "#344346",
                    color: "#F9FBFB",
                },
                root: {
                    marginBottom: 16
                }
            }
        },
        'NumberInput': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "#F9FBFB",
                    marginBottom: 8
                },
                input: {
                    borderColor: "#FE4A23",
                    background: "#344346",
                    color: "#F9FBFB",
                },
                root: {
                    marginBottom: 16
                }
            }
        },
        'Title':{
            styles:{
                color:"#FE4A23"
            }
        },
        'PasswordInput': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "#F9FBFB",
                    marginBottom: 8
                },
                root: {
                    marginBottom: 16
                },
                input: {
                    borderColor: "#FE4A23",
                    background: "#344346",
                    color: "#F9FBFB",
                }
            }
        },
        'Select': {
            styles: {
                label: {
                    fontSize: 14,
                    color: "#F9FBFB",
                    marginBottom: 8
                },
                root: {
                    marginBottom: 16
                },
                input: {
                    borderColor: "#FE4A23",
                    background: "#344346",
                    color: "#F9FBFB",
                }
            }
        }
    }
});


export default theme;