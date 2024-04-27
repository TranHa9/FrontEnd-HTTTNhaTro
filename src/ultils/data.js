import generateCode from "./Common/generateCode"

const prices = [
    {
        min: 0,
        max: 1,
        value: 'Dưới 1 triệu',
        type: 'price'
    },
    {
        min: 1,
        max: 2,
        value: 'Từ 1 - 2 triệu',
        type: 'price'
    },
    {
        min: 2,
        max: 3,
        value: 'Từ 2 - 3 triệu',
        type: 'price'
    },
    {
        min: 3,
        max: 5,
        value: 'Từ 3 - 5 triệu',
        type: 'price'
    },
    {
        min: 5,
        max: 7,
        value: 'Từ 5 - 7 triệu',
        type: 'price'
    },
    {
        min: 7,
        max: 10,
        value: 'Từ 7 - 10 triệu',
        type: 'price'
    },
    {
        min: 10,
        max: 15,
        value: 'Từ 10 - 15 triệu',
        type: 'price'
    },
    {
        min: 15,
        max: 999999,
        value: 'Trên 15 triệu',
        type: 'price'
    },
]

const areas = [
    {
        min: 0,
        max: 20,
        value: 'Dưới 20m',
        type: 'area'
    },
    {
        min: 20,
        max: 30,
        value: 'Từ 20m - 30m',
        type: 'area'
    },
    {
        min: 30,
        max: 50,
        value: 'Từ 30m - 50m',
        type: 'area'
    },
    {
        min: 50,
        max: 70,
        value: 'Từ 50m - 70m',
        type: 'area'
    },
    {
        min: 70,
        max: 90,
        value: 'Từ 70m - 90m',
        type: 'area'
    },
    {
        min: 90,
        max: 999999,
        value: 'Trên 90m',
        type: 'area'
    },
]

export const dataPrices = prices.map(item => ({
    ...item,
    code: generateCode(item.value),
}))

export const dataAreas = areas.map(item => ({
    ...item,
    code: generateCode(item.value),
}))