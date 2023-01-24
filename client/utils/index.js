export const isAuth =user => user.email !="" && user.role!="" && user.id!="" && user.firstName!=""


export const santinizedFB = (feedbacks, feedBackRange) => {
    if(!feedbacks || !feedbacks.length) return {avg:0, total:0, percentObj:[]}
    const sumObj = feedbacks.reduce((acc, fb) => {
        acc.total += Number(fb.rating)
        acc.count += Number(fb.count)
        return acc
    }, {total:0, count:0})
    
    const percentObj = feedBackRange.reduce((acc, fb) => {
        const fbObj = feedbacks.find(f => f.feedback_rating === Number(fb))
        acc[fb-1] = fbObj ? parseInt(Number(fbObj.count)/sumObj.count*100) : 0
        return acc
    },[])

    return {
        avg: Number(parseFloat(sumObj.total/sumObj.count).toFixed(1)),
        total: Number(sumObj.count),
        percentObj
    }
}