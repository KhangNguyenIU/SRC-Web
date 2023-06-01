export const messageType ={
    TEXT: 'text',
    IMAGE: 'image',
}

export const loadingType ={
    GENERAL: 'general',
    MESSAGE: 'message',
}

export const MAX_QUESTIONS_LENGTH= 9;
export const MAX_QUESTIONS_SET = 6;

export const StudentPoints = {
    Math: 7,
    English: 5,
    Physics: 6,
    Biology: 3,
    Chemistry: 6,
    Literature: 7,
    History: 5,
    Geography: 4
}


export const Subject = {
    MATH: 'Math',
    ENGLISH: 'English',
    PHYSICS: 'Physics',
    BIOLOGY: 'Biology',
    CHEMISTRY: 'Chemistry',
    LITERATURE: 'Literature',
    HISTORY: 'History',
    GEOGRAPHY: 'Geography'
}

export const CombinationEnum ={
    A00: 'A00',
    A01: 'A01',
    A02: 'A02',
    B00: 'B00',
    B08: 'B08',
    D01: 'D01',
    D07: 'D07',
    D09: 'D09',
    D14: 'D14',
    D15: 'D15',
}
export const Combination = {
    A00: [Subject.MATH, Subject.CHEMISTRY, Subject.PHYSICS],
    A01: [Subject.MATH, Subject.PHYSICS, Subject.ENGLISH],
    A02: [Subject.MATH, Subject.PHYSICS, Subject.BIOLOGY],
    B00: [Subject.MATH, Subject.CHEMISTRY, Subject.BIOLOGY],
    B08: [Subject.MATH, Subject.BIOLOGY, Subject.ENGLISH],
    D01: [Subject.LITERATURE, Subject.MATH, Subject.ENGLISH],
    D07: [Subject.ENGLISH, Subject.MATH, Subject.CHEMISTRY],
    D09: [Subject.ENGLISH, Subject.MATH, Subject.HISTORY],
    D14: [Subject.ENGLISH, Subject.LITERATURE, Subject.HISTORY],
    D15: [Subject.ENGLISH, Subject.LITERATURE, Subject.GEOGRAPHY],
}

export const StudentCombination = {
    A00: 0,
    A01: 0,
    A02: 0,
    B00: 0,
    B08: 0,
    D01: 0,
    D07: 0,
    D14: 0,
    D15: 0,
}

export const Majors = 
{
    English: {
        combination: [CombinationEnum.A00, CombinationEnum.D09, CombinationEnum.D14, CombinationEnum.D15],
        benchmark: 25,
    },
    BusinessAdministration: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00, CombinationEnum.D07],
        benchmark: 23
    },
    FinanceBanking: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00, CombinationEnum.D07],
        benchmark: 22
    },
    Accounting: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00, CombinationEnum.D07],
        benchmark: 22
    },
    BioTechnology: {
        combination: [CombinationEnum.A00, CombinationEnum.B00, CombinationEnum.B08, CombinationEnum.D07],
        benchmark: 20
    },
    Chemistry: {
        combination: [CombinationEnum.A00, CombinationEnum.B00, CombinationEnum.B08, CombinationEnum.D07],
        benchmark: 18
    },
    FoodTeachnology: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.B00, CombinationEnum.D07],
        benchmark: 20
    },
    ChemicalEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.B00, CombinationEnum.D07],
        benchmark: 20
    },
    //toan ung dung
    AppliedMath: {
        combination: [CombinationEnum.A00, CombinationEnum.A01],
        benchmark: 20
    },
    ComputerScience: {
        combination: [CombinationEnum.A00, CombinationEnum.A01],
        benchmark: 25
    },
    InformationTechnology: {
        combination: [CombinationEnum.A00, CombinationEnum.A01],
        benchmark: 27.5
    },
    DataScience: {
        combination: [CombinationEnum.A00, CombinationEnum.A01],
        benchmark: 26
    },
    Logistics: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00],
        benchmark: 25
    },
    IndustrialSystemEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00],
        benchmark: 20
    },
    BiomedicalEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.B00, CombinationEnum.B08, CombinationEnum.D07],
        benchmark: 22
    },
    SpaceEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A02, CombinationEnum.D09],
        benchmark: 21
    },
    EnvironmentalEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A02, CombinationEnum.B00, CombinationEnum.D07],
        benchmark: 18
    },
    ElectronicEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.B00, CombinationEnum.A00],
        benchmark: 21
    },
    ControlAndAutomationEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.B00,CombinationEnum.A00],
        benchmark: 21.5
    },
    CivilEngineering: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.D07],
        benchmark: 20
    },
    ConstructionManagement: {
        combination: [CombinationEnum.A00, CombinationEnum.A01, CombinationEnum.A00, CombinationEnum.D07],
        benchmark: 20
    }
}
