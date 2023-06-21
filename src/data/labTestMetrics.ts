const labTestMetrics = [
    {
        order: 1,
        id: 'white-blood-cells',
        name: 'White Blood Cells',
        unit: 'g/l',
        categoryId: 'Blood',
        reference: '4.5 - 11',
        decimals: 1,
    },
    {
        order: 2,
        id: 'red-blood-cells',
        name: 'Red Blood Cells',
        unit: 't/l',
        categoryId: 'Blood',
        reference: '4.6 - 6.2',
        decimals: 1,
    },
    {
        order: 3,
        id: 'blood-platelets',
        name: 'Blood Platelets',
        unit: 'g/l',
        categoryId: 'Blood',
        reference: '150 - 400',
        decimals: 1,
    },
    {
        order: 1,
        id: 'red-blood-cell-inflammation',
        name: 'Red Blood Cells Inflammation Speed',
        unit: 'mm/hr',
        categoryId: 'Inflammation',
        reference: '< 20',
    },
    {
        order: 2,
        id: 'c-reactive-protein',
        name: 'C Reactive Protein',
        unit: 'mg/l',
        categoryId: 'Inflammation',
        reference: '< 5',
    },
    {
        order: 1,
        id: 'creatinine',
        name: 'Creatinine',
        unit: 'mg/l',
        categoryId: 'Kidneys',
        reference: '7 - 13',
        decimals: 1,
    },
    {
        order: 2,
        id: 'creatinine-clearance',
        name: 'Creatinine Clearance G&C',
        unit: 'ml/mn',
        categoryId: 'Kidneys',
        reference: '',
        decimals: 1,
    },
    {
        order: 3,
        id: 'urea',
        name: 'urea',
        unit: 'g/L',
        categoryId: 'Kidneys',
        reference: '',
        decimals: 1,
    },
    {
        order: 1,
        id: 'bilirubin',
        name: 'Bilirubin',
        unit: 'mg/L',
        categoryId: 'Liver',
        reference: '',
        decimals: 1,
    },
    {
        order: 2,
        id: 'ast',
        name: 'AST',
        unit: 'u/L',
        categoryId: 'Liver',
        reference: '< 50',
    },
    {
        order: 3,
        id: 'alt',
        name: 'ALT',
        unit: 'u/L',
        categoryId: 'Liver',
        reference: '< 50',
    },
    {
        order: 4,
        id: 'alp',
        name: 'ALP',
        unit: 'ui/L',
        categoryId: 'Liver',
        reference: '',
    },
    {
        order: 5,
        id: 'fib-4',
        name: 'Fib-4 Score',
        unit: '',
        categoryId: 'Liver',
        reference: '< 1.3',
        decimals: 2,
    },
    {
        order: 1,
        id: 'sodium',
        name: 'Sodium',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        reference: '136 - 146',
    },
    {
        order: 2,
        id: 'potassium',
        name: 'Potassium',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        reference: '3.5 - 5.1',
        decimals: 1,
    },
    {
        order: 3,
        id: 'chloride',
        name: 'Chloride',
        unit: 'mmol/L',
        categoryId: 'Metabolism',
        reference: '101 - 109',
    },
    {
        order: 4,
        id: 'glucose',
        name: 'Glucose',
        unit: 'g/L',
        categoryId: 'Metabolism',
        reference: '< 1',
        decimals: 2,
    },
    {
        order: 5,
        id: 'calcium',
        name: 'Calcium',
        unit: 'mg/L',
        categoryId: 'Metabolism',
        reference: '88 - 106',
    },
    {
        order: 6,
        id: 'total-protein',
        name: 'Total Protein',
        unit: 'g/L',
        categoryId: 'Metabolism',
        reference: '',
    },
    {
        order: 1,
        id: 'tsh-thyriod',
        name: 'TSH Thyriod',
        unit: 'uui/mL',
        categoryId: 'Hormones',
        reference: '0.5 - 5',
        decimals: 2,
    },
    {
        order: 2,
        id: 'testosterone-nmol',
        name: 'Testosterone',
        unit: 'nmol/L',
        categoryId: 'Hormones',
        reference: '13 - 30',
        decimals: 2,
    },
    {
        order: 3,
        id: 'testosterone-ng',
        name: 'Testosterone',
        unit: 'ng/dL',
        categoryId: 'Hormones',
        reference: '> 400',
    },
    {
        order: 1,
        id: 'total-cholesterol',
        name: 'Total Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        reference: '',
        decimals: 2,
    },
    {
        order: 2,
        id: 'hdl-cholesterol',
        name: 'HDL Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        reference: '',
        decimals: 2,
    },
    {
        order: 3,
        id: 'ldl-cholesterol',
        name: 'LDL Cholesterol',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        reference: '< 1.5',
        decimals: 2,
    },
    {
        order: 4,
        id: 'tryglycerides',
        name: 'Tryglycerides',
        unit: 'g/L',
        categoryId: 'Cholesterol',
        reference: '< 1.5',
        decimals: 2,
    },
    {
        order: 1,
        id: 'vitamine-d',
        name: 'Vitamine D2/3',
        unit: 'nmol/L',
        categoryId: 'Vitamins',
        reference: '100 - 160',
    },
    {
        order: 2,
        id: 'vitamine-b12',
        name: 'Vitamine B12',
        unit: 'pmol/L',
        categoryId: 'Vitamins',
        reference: '175 - 652',
    },
    {
        order: 3,
        id: 'iron',
        name: 'Iron',
        unit: 'ng/mL',
        categoryId: 'Vitamins',
        reference: '50 - 275',
    },
]

export default labTestMetrics
