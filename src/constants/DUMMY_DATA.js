// Employee data
export const employeeData = [
  {
    id: 1,
    title: 'ضباط',
    total: 25,
    present: 22,
    missing: 3,
  },
  {
    id: 2,
    title: 'نواخذة',
    total: 18,
    present: 16,
    missing: 2,
  },
  {
    id: 3,
    title: 'بحرية',
    total: 12,
    present: 11,
    missing: 1,
  },
  {
    id: 4,
    title: 'مدني فني',
    total: 8,
    present: 7,
    missing: 1,
  },
  {
    id: 5,
    title: 'مهني فني',
    total: 6,
    present: 6,
    missing: 0,
  },
  {
    id: 6,
    title: 'مهني طباخ',
    total: 4,
    present: 4,
    missing: 0,
  },
  {
    id: 7,
    title: 'الجيس البنغالي فني',
    total: 10,
    present: 9,
    missing: 1,
  },
  {
    id: 8,
    title: 'الجيش البنغالي طباخ',
    total: 7,
    present: 6,
    missing: 1,
  }
];

// Sample audience data
export const audienceData = [
  { id: 1, fullName: 'أحمد محمد علي', rank: 'ملازم أول', jobTitle: 'ضابط بحري', category: 'ضباط', attendance: true },
  { id: 2, fullName: 'محمد أحمد سالم', rank: 'ملازم', jobTitle: 'ضابط إنقاذ', category: 'ضباط', attendance: false },
  { id: 3, fullName: 'علي سالم محمد', rank: 'رقيب أول', jobTitle: 'مشغل راديو', category: 'ضباط صف', attendance: false },
  { id: 4, fullName: 'سالم أحمد علي', rank: 'رقيب', jobTitle: 'فني محركات', category: 'ضباط صف', attendance: false },
  { id: 5, fullName: 'محمد علي أحمد', rank: 'عريف', jobTitle: 'بحار', category: 'أفراد', attendance: true },
  { id: 6, fullName: 'خالد عبدالله محمد', rank: 'نقيب', jobTitle: 'قائد دورية', category: 'ضباط', attendance: false },
  { id: 7, fullName: 'عبدالرحمن سالم أحمد', rank: 'رقيب أول', jobTitle: 'مشغل رادار', category: 'ضباط صف', attendance: true },
];

// Sample distribution data
export const distributionData = [
  { id: 1, fullName: 'أحمد محمد علي', jobTitle: 'ضابط بحري', rank: 'المنطقة الشمالية', distribution: 10 },
  { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ضابط إنقاذ', rank: 'المنطقة الجنوبية', distribution: null },
  { id: 3, fullName: 'علي سالم محمد', jobTitle: 'مشغل راديو', rank: 'المنطقة الوسطى', distribution: null },
];

// Sample operations data
export const operationsData = [
  { id: 1, rank: 'ملازم أول', jobTitle: 'ضابط بحري', fullName: 'أحمد محمد علي', distribution: 'دورية بحرية', receiptLocation: 'الاحمدية', phoneNumber: '12345678' },
  { id: 2, rank: 'ملازم', jobTitle: 'ضابط إنقاذ', fullName: 'محمد أحمد سالم', distribution: 'مراقبة ساحلية', receiptLocation: null, phoneNumber: '23456789' },
  { id: 3, rank: 'رقيب أول', jobTitle: 'مشغل راديو', fullName: 'علي سالم محمد', distribution: 'اتصالات', receiptLocation: 'الحيشان', phoneNumber: '34567890' },
  { id: 4, rank: 'رقيب أول', jobTitle: 'نواخذه', fullName: 'عبداللة خالد', distribution: '10', receiptLocation: '', phoneNumber: '34567890' },
];

// Sample outsiders data
export const outsidersData = [
  // has rank, jobtitle, name, reason, date, calender (from date to date)
  { id: 1, fullName: 'أحمد محمد علي', jobTitle: 'ملازم أول', rank: 'رائد', reason: 'رخصة', hasDate: true, dateFrom: '2025-08-15', dateTo: '2025-08-17' },
  { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ملازم', rank: 'ضباط', reason: null, hasDate: false },
  { id: 2, fullName: 'محمد أحمد سالم', jobTitle: 'ملازم', rank: 'نواخذة', reason: null, hasDate: false },
];

// Sample crews data
export const crewsData = {
  "التوزيع الاول": [
    { id: 1, rank: 'طاقم ألفا', jobTitle: 'أحمد محمد علي', name: 'محمد أحمد سالم' },
    { id: 2, rank: 'طاقم بيتا', jobTitle: 'علي سالم محمد', name: 'سالم أحمد علي'  },
    { id: 3, rank: 'طاقم جاما', jobTitle: 'محمد علي أحمد', name: 'خالد عبدالله محمد' },
  ],
  "التوزيع الثاني": [
    { id: 4, rank: 'طاقم دلتا', jobTitle: 'علي محمد أحمد', name: 'سالم عبدالله علي' },
    { id: 5, rank: 'طاقم إبسيلون', jobTitle: 'خالد علي محمد', name: 'أحمد سالم علي' },
    { id: 6, rank: 'طاقم زيتا', jobTitle: 'عبدالله محمد علي', name: 'علي أحمد سالم' },
  ],
  "التوزيع الثالث": [
    { id: 7, rank: 'طاقم أوميغا', jobTitle: 'خالد محمد علي', name: 'أحمد علي سالم' },
    { id: 8, rank: 'طاقم سيغما', jobTitle: 'سالم علي محمد', name: 'محمد أحمد عبدالله' },
  ],
  "التوزيع الرابع": [
    { id: 9, rank: 'طاقم تابا', jobTitle: 'علي أحمد محمد', name: 'خالد سالم علي' },
    { id: 10, rank: 'طاقم كابا', jobTitle: 'سالم علي أحمد', name: 'عبدالله محمد سالم' },
  ],
  "التوزيع الخامس": [
    { id: 11, rank: 'طاقم لامدا', jobTitle: 'أحمد علي محمد', name: 'خالد عبدالله سالم' },
    { id: 12, rank: 'طاقم نيو', jobTitle: 'محمد سالم علي', name: 'علي أحمد عبدالله' },
  ],
};

// Sample archive data
export const archiveData = [
  {
    id: 1,
    day: 'السبت',
    date: '2025-08-15',
    time: '08:00',
    user: 'أحمد محمد علي',
    rank: 'ملازم أول',
    type: 'حضور',
    details: 'تسجيل حضور في الوقت المحدد',
  },
  {
    id: 2,
    day: 'السبت',
    date: '2025-08-15',
    time: '09:00',
    user: 'محمد أحمد سالم',
    rank: 'ظباط',
    type: 'توزيع',
    details: 'تم توزيع الحضور'
  },
  {
    id: 3,
    day: 'السبت',
    date: '2025-08-15',
    time: '09:00',
    user: 'محمد أحمد سالم',
    rank: 'ظباط',
    type: 'خوارج',
    details: 'لم يتم تسجيل الحضور'
  },
  {
    id: 4,
    day: 'السبت',
    date: '2025-08-15',
    time: '09:00',
    user: 'محمد أحمد سالم',
    rank: 'ظباط',
    type: 'عمليات',
    details: 'تم توزيع العمليات'
  }
]

// Sample replacement data
export const replacementData = [
  {
    id: 1,
    fullName: 'أحمد محمد علي',
    rank: 'المنطقة الشمالية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
  {
    id: 2,
    fullName: 'محمد أحمد سالم',
    rank: 'المنطقة الجنوبية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
  {
    id: 2,
    fullName: 'محمد أحمد سالم',
    rank: 'المنطقة الجنوبية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
];

// Sample technical data
export const technicalData = [
  {
    id: 1,
    fullName: 'أحمد محمد علي',
    rank: 'المنطقة الشمالية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
  {
    id: 2,
    fullName: 'محمد أحمد سالم',
    rank: 'المنطقة الجنوبية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
  {
    id: 2,
    fullName: 'محمد أحمد سالم',
    rank: 'المنطقة الجنوبية',
    reason: ['خوارج', 'حضور', 'توزيع', 'عمليات'],
  },
];


// ----------------------------------------------------------------------------------------
// ****************************************************************************************
// ----------------------------------------------------------------------------------------

// Malfunctions data
export const malfunctionsData = [
  {
    id: 1,
    title: 'الزوارق',
    total: 6,
    valid: 22,
    notValid: 3,
  },
  {
    id: 2,
    title: 'الوحدات',
    total: 4,
    valid: 4,
    notValid: 0,
  },
  {
    id: 3,
    title: 'الربس',
    total: 13,
    valid: 11,
    notValid: 2,
  },
  {
    id: 4,
    title: 'تامبه',
    total: 17,
    valid: 14,
    notValid: 1,
  },
  {
    id: 5,
    title: 'كونسبت',
    total: 3,
    valid: 2,
    notValid: 1,
  },
  {
    id: 6,
    title: 'مجنم',
    total: 1,
    valid: 1,
    notValid: 0,
  },
];

// Sample malfunctions table data
export const malfunctionsTablesData = [
  { id: 1, malfunctionNumber: 'عطل في المحرك', valid: true, reportText: 'تم إصلاح المحرك بنجاح.', fixTime: '3 ايام', notes: '' },
  { id: 2, malfunctionNumber: 'عطل في نظام الملاحة', valid: true, reportText: 'تم إصلاح نظام الملاحة بنجاح.', fixTime: '3 ايام', notes: ''},
  { id: 3, malfunctionNumber: 'عطل في الراديو', valid: true, reportText: 'تم إصلاح الراديو بنجاح.', fixTime: '3 ايام', notes: 'قسم الكهرباء'},
  { id: 4, malfunctionNumber: 'عطل في المحركات', valid: true, reportText: 'تم إصلاح المحركات بنجاح.', fixTime: '3 ايام', notes: ''},
  { id: 5, malfunctionNumber: 'عطل في نظام التوجيه', valid: true, reportText: 'تم إصلاح نظام التوجيه بنجاح.', fixTime: '3 ايام', notes: ''},
  { id: 6, malfunctionNumber: 'عطل في نظام الإضاءة', valid: true, reportText: 'تم إصلاح نظام الإضاءة بنجاح.', fixTime: '3 ايام', notes: ''},
  { id: 7, malfunctionNumber: 'عطل في نظام الرادار', valid: true, reportText: 'تم إصلاح نظام الرادار بنجاح.', fixTime: '3 ايام', notes: 'قسم الرادار'},
];