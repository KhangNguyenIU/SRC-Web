import {StudentPoints, Subject, Combination, CombinationEnum, StudentCombination, Majors} from '@constants'

const CalStuPts = async (stuPts) =>{
    let result ={}
    await Object.entries(Combination).forEach(([key, value]) => 
    {
        let sum = 0;
        value.forEach(subject => {
            sum += stuPts[subject];
        })
        result[key] = sum;
    })
    return result
}

const filterMajor = async (stuPts) => {
    console.log({stuPts})
    let result = {}
    await Object.entries(Majors).forEach(([key, value]) => {
        value.combination.forEach(combination => {
            if(stuPts[combination] >= value.benchmark){
                if(result[key] == undefined){
                    result[key] = [combination]
                }else{
                    result[key].push(combination)
                }
            }
        })
    })
    return result
}

export const majorsSuggest = async (stuPts) => {
    const stuCombPts = await CalStuPts(stuPts)
    const majors = await filterMajor(stuCombPts)

    return {stuCombPts, majors}
}