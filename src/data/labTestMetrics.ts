const labTestMetrics = [
    {
        order: 1,
        id: 'white-blood-cells',
        name: 'White Blood Cells',
        unit: 'g/l',
        categoryId: 'Blood',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '4.5',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '11',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'red-blood-cells',
        name: 'Red Blood Cells',
        unit: 't/l',
        categoryId: 'Blood',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '4.6',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '6.2',
        },
        decimals: 1,
    },
    {
        order: 3,
        id: 'blood-platelets',
        name: 'Blood Platelets',
        unit: 'g/l',
        categoryId: 'Blood',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '150',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '400',
        },
        decimals: 1,
    },
    {
        order: 1,
        id: 'red-blood-cell-inflammation',
        name: 'Red Blood Cells Inflammation Speed',
        unit: 'mm/hr',
        categoryId: 'Inflammation',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '20',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '19',
        },
    },
    {
        order: 2,
        id: 'c-reactive-protein',
        name: 'C Reactive Protein',
        unit: 'mg/l',
        categoryId: 'Inflammation',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '5',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '4',
        },
    },
    {
        order: 1,
        id: 'creatinine',
        name: 'Creatinine',
        unit: 'mg/l',
        categoryId: 'Kidneys',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '7',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '13',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'creatinine-clearance',
        name: 'Creatinine Clearance G&C',
        unit: 'ml/mn',
        categoryId: 'Kidneys',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 3,
        id: 'urea',
        name: 'urea',
        unit: 'g/L',
        categoryId: 'Kidneys',
        conditionsMode: '',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 1,
        id: 'bilirubin',
        name: 'Bilirubin',
        unit: 'mg/L',
        categoryId: 'Liver',
        conditionsMode: '',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 1,
    },
    {
        order: 2,
        id: 'ast',
        name: 'AST',
        unit: 'u/L',
        categoryId: 'Liver',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '50',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '49',
        },
    },
    {
        order: 3,
        id: 'alt',
        name: 'ALT',
        unit: 'u/L',
        categoryId: 'Liver',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '50',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '49',
        },
    },
    {
        order: 4,
        id: 'alp',
        name: 'ALP',
        unit: 'ui/L',
        categoryId: 'Liver',
        conditionsMode: '',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 5,
        id: 'fib-4',
        name: 'Fib-4 Score',
        unit: '',
        categoryId: 'Liver',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '1.3',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '1.2',
        },
        decimals: 2,
    },
    {
        order: 1,
        id: 'sodium',
        name: 'Sodium',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '135',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '146',
        },
    },
    {
        order: 2,
        id: 'potassium',
        name: 'Potassium',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '3.4',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '5.1',
        },
        decimals: 1,
    },
    {
        order: 3,
        id: 'chloride',
        name: 'Chloride',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '100',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '109',
        },
    },
    {
        order: 4,
        id: 'glucose',
        name: 'Glucose',
        unit: 'g/L',
        categoryId: 'Metabolism',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '1',
        },
        medium: {
            value1: '1',
            value2: '1.10',
        },
        bad: {
            mode: 'more',
            value: '1.10',
        },
        decimals: 2,
    },
    {
        order: 5,
        id: 'calcium',
        name: 'Calcium',
        unit: 'mg/L',
        categoryId: 'Metabolism',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '87',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '106',
        },
    },
    {
        order: 6,
        id: 'total-protein',
        name: 'Total Protein',
        unit: 'g/L',
        categoryId: 'Metabolism',
        conditionsMode: '',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
    },
    {
        order: 1,
        id: 'tsh-thyriod',
        name: 'TSH Thyriod',
        unit: 'uui/mL',
        categoryId: 'Hormones',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '0.49',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'more',
            value: '5',
        },
        decimals: 2,
    },
    {
        order: 2,
        id: 'testosterone-nmol',
        name: 'Testosterone',
        unit: 'nmol/L',
        categoryId: 'Hormones',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '13',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'less',
            value: '13',
        },
        decimals: 2,
    },
    {
        order: 3,
        id: 'testosterone-ng',
        name: 'Testosterone',
        unit: 'ng/dL',
        categoryId: 'Hormones',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '365',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'less',
            value: '365',
        },
    },
    {
        order: 1,
        id: 'total-cholesterol',
        name: 'Total Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        conditionsMode: 'lower',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 2,
        id: 'hdl-cholesterol',
        name: 'HDL Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        conditionsMode: 'higher',
        good: {
            mode: '',
            value: '',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: '',
            value: '',
        },
        decimals: 2,
    },
    {
        order: 3,
        id: 'ldl-cholesterol',
        name: 'LDL Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '1',
        },
        medium: {
            value1: '1.1',
            value2: '1.5',
        },
        bad: {
            mode: 'more',
            value: '1.5',
        },
        decimals: 2,
    },
    {
        order: 4,
        id: 'tryglycerides',
        name: 'Tryglycerides',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        conditionsMode: 'range',
        good: {
            mode: 'less',
            value: '1',
        },
        medium: {
            value1: '1.1',
            value2: '1.5',
        },
        bad: {
            mode: 'more',
            value: '1.5',
        },
        decimals: 2,
    },
    {
        order: 1,
        id: 'vitamine-d',
        name: 'Vitamine D2/3',
        unit: 'nmol/L',
        categoryId: 'Vitamins',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '100',
        },
        medium: {
            value1: '75',
            value2: '100',
        },
        bad: {
            mode: 'less',
            value: '75',
        },
    },
    {
        order: 2,
        id: 'vitamine-b12',
        name: 'Vitamine B12',
        unit: 'pmol/L',
        categoryId: 'Vitamins',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '175',
        },
        medium: {
            value1: '138',
            value2: '175',
        },
        bad: {
            mode: 'less',
            value: '175',
        },
    },
    {
        order: 3,
        id: 'iron',
        name: 'Iron',
        unit: 'ng/mL',
        categoryId: 'Vitamins',
        conditionsMode: 'range',
        good: {
            mode: 'more',
            value: '21',
        },
        medium: {
            value1: '',
            value2: '',
        },
        bad: {
            mode: 'less',
            value: '22',
        },
    },
]

export default labTestMetrics
